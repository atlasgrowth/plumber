import { Octokit } from "@octokit/rest";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  throw new Error("GITHUB_TOKEN not found in environment variables");
}

const octokit = new Octokit({ auth: token });

async function deploy() {
  try {
    // Create repository
    const { data: repo } = await octokit.repos.createForAuthenticatedUser({
      name: "plumbingtemplate1",
      description: "Dynamic React website for plumbing services",
      private: false,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
    });

    console.log("Repository created successfully");

    // Initialize git and push code
    execSync("git init", { stdio: "inherit" });
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "Initial commit"', { stdio: "inherit" });
    execSync(`git remote add origin ${repo.clone_url}`, { stdio: "inherit" });
    execSync("git push -u origin main", { stdio: "inherit" });

    // Build the site
    execSync("npm run build", { stdio: "inherit" });

    // Configure GitHub Pages
    await octokit.repos.createPagesSite({
      owner: repo.owner.login,
      repo: repo.name,
      source: {
        branch: "main",
        path: "/dist",
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
