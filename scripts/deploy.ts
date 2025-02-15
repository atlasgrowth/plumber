import { Octokit } from "@octokit/rest";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error("GITHUB_TOKEN not found in environment variables");
}

const octokit = new Octokit({ auth: token });
const repoName = "plumbingtemplate1";

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
    execSync(`git remote add origin https://${token}@github.com/${repo.owner.login}/${repo.name}.git`, { stdio: "inherit" });
    execSync("git push -u origin main --force", { stdio: "inherit" });

    // Build the site
    execSync("npm run build", { stdio: "inherit" });

    // Configure GitHub Pages
    await octokit.repos.createPagesSite({
      owner: repo.owner.login,
      repo: repo.name,
      source: {
        branch: "main",
        path: "/",
      },
    });

    console.log("GitHub Pages configured successfully");
    console.log(`Site will be available at: ${repo.html_url}`);

  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

deploy();