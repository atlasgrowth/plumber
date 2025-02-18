import { execSync } from "child_process";
import fs from "fs";
import path from "path";

async function deploy() {
  try {
    // Build the site
    execSync("npm run build", { stdio: "inherit" });

    // Initialize git if not already initialized
    execSync("git init", { stdio: "inherit" });

    // Configure git
    execSync("git config user.name 'Deployment Bot'", { stdio: "inherit" });
    execSync("git config user.email 'deploy@example.com'", { stdio: "inherit" });

    // Add GitHub repository as remote
    try {
      execSync("git remote remove origin", { stdio: "inherit" });
    } catch (e) {
      // Ignore error if remote doesn't exist
    }
    execSync("git remote add origin https://github.com/yourusername/plumbernearme.git", { stdio: "inherit" });

    // Create and switch to gh-pages branch
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

    // Stage and commit changes
    execSync("git add .", { stdio: "inherit" });
    try {
      execSync('git commit -m "Deploy to GitHub Pages"', { stdio: "inherit" });
    } catch (e) {
      console.log('No changes to commit, continuing deployment...');
    }

    // Push to GitHub
    execSync("git push -u origin gh-pages --force", { stdio: "inherit" });

    // Switch back to main branch
    execSync("git checkout main", { stdio: "inherit" });

    console.log("Deployed successfully to GitHub Pages");
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

deploy();