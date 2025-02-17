import { Octokit } from "@octokit/rest";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error("GITHUB_TOKEN not found in environment variables");
}

const octokit = new Octokit({ auth: token });
const repoName = "plumbingwebsite";

async function deploy() {
  try {
    let repo;

    try {
      // Try to get existing repository
      const { data: existingRepo } = await octokit.repos.get({
        owner: (await octokit.users.getAuthenticated()).data.login,
        repo: repoName,
      });
      repo = existingRepo;
      console.log("Using existing repository");
    } catch (e) {
      // Create new repository if it doesn't exist
      const { data: newRepo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: "Dynamic React website for plumbing services",
        private: false,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
      });
      repo = newRepo;
      console.log("Repository created successfully");
    }

    // Initialize git and push code
    execSync("git init", { stdio: "inherit" });
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "Initial commit"', { stdio: "inherit" });

    // Remove existing remote if it exists
    try {
      execSync("git remote remove origin", { stdio: "inherit" });
    } catch (e) {
      // Ignore error if remote doesn't exist
    }

    // Add new remote and push
    execSync(`git remote add origin https://${token}@github.com/${repo.owner.login}/${repo.name}.git`, { stdio: "inherit" });
    execSync("git push -u origin main --force", { stdio: "inherit" });

    // Build the site
    execSync("npm run build", { stdio: "inherit" });

    // Create and checkout gh-pages branch
    try {
      execSync("git checkout -b gh-pages", { stdio: "inherit" });
    } catch (e) {
      execSync("git checkout gh-pages", { stdio: "inherit" });
    }

    // Clean the root directory except for .git and dist
    const rootDir = process.cwd();
    fs.readdirSync(rootDir).forEach(file => {
      if (file !== '.git' && file !== 'dist') {
        const filePath = path.join(rootDir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
          fs.rmSync(filePath, { recursive: true, force: true });
        } else {
          fs.unlinkSync(filePath);
        }
      }
    });

    // Copy built files from dist/public to root
    const publicDir = path.join(process.cwd(), "dist", "public");
    const copyRecursive = (src: string, dest: string) => {
      if (fs.lstatSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(childItemName => {
          copyRecursive(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };

    fs.readdirSync(publicDir).forEach(file => {
      const src = path.join(publicDir, file);
      const dest = path.join(rootDir, file);
      copyRecursive(src, dest);
    });

    // Commit and push the build files
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "Deploy to GitHub Pages"', { stdio: "inherit" });
    execSync("git push -u origin gh-pages --force", { stdio: "inherit" });

    // Switch back to main branch
    execSync("git checkout main", { stdio: "inherit" });

    // Update GitHub Pages configuration to use gh-pages branch
    try {
      await octokit.repos.updateInformationAboutPagesSite({
        owner: repo.owner.login,
        repo: repo.name,
        source: {
          branch: "gh-pages",
          path: "/",
        },
      });
    } catch (e) {
      console.log("Pages already configured, updating source...");
      // If updating fails, try to create
      await octokit.repos.createPagesSite({
        owner: repo.owner.login,
        repo: repo.name,
        source: {
          branch: "gh-pages",
          path: "/",
        },
      });
    }

    console.log("GitHub Pages configured successfully");
    console.log(`Site will be available at: https://${repo.owner.login}.github.io/${repo.name}`);

  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

deploy();