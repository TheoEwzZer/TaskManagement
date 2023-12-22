<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>TASK MANAGEMENT</h1>
<h3>◦ TaskManagement, Boost Your Productivity</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat-square&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat-square&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat-square&logo=YAML&logoColor=white" alt="YAML" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat-square&logo=ESLint&logoColor=white" alt="ESLint" />

<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=flat-square&logo=Lodash&logoColor=white" alt="Lodash" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat-square&logo=Prisma&logoColor=white" alt="Prisma" />
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat-square&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions" />
<img src="https://img.shields.io/badge/Stripe-008CDD.svg?style=flat-square&logo=Stripe&logoColor=white" alt="Stripe" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/license/TheoEwzZer/TaskManagement?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/TheoEwzZer/TaskManagement?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/TheoEwzZer/TaskManagement?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/TheoEwzZer/TaskManagement?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Installation](#-installation)
  - [🤖 Running TaskManagement](#-running-taskmanagement)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

This project is a web application inspired by Trello. It's designed to manage tasks and projects within organizations and workspaces. The application is built with a MySQL database and Prisma ORM, and the UI is developed using shadcnUI & TailwindCSS.

---

## 📦 Features

|     | Feature                        | Description                                                                     |
| --- | ------------------------------ | ------------------------------------------------------------------------------- |
| 🔐  | **Auth**                       | User authentication system.                                                     |
| 🌐  | **Organizations / Workspaces** | Manage tasks and projects within organizations and workspaces.                  |
| 📋  | **Board creation**             | Create new boards for managing tasks.                                           |
| 🖼️  | **Unsplash API**               | Integration with Unsplash API for random beautiful cover images.                |
| 📜  | **Activity log**               | Keep track of all activities within an organization.                            |
| ✏️  | **Board rename and delete**    | Rename and delete boards as needed.                                             |
| 🗂️  | **List creation**              | Create new lists for organizing tasks.                                          |
| 🔄  | **List management**            | Rename, delete, reorder through drag & drop, and copy lists.                    |
| 📦  | **Card creation**              | Create new cards for tasks.                                                     |
| 📝  | **Card management**            | Add a description, rename, delete, reorder through drag & drop, and copy cards. |
| 📜  | **Card activity log**          | Keep track of all activities related to a card.                                 |
| 🚀  | **Board limit**                | Set a limit on the number of boards for each organization.                      |
| 💳  | **Stripe subscription**        | Enable Stripe subscription for each organization to unlock unlimited boards.    |
| 🏠  | **Landing page**               | A welcoming landing page for the application.                                   |
| 🗃️  | **MySQL DB**                   | Use a MySQL database for data management.                                       |
| 🛠️  | **Prisma ORM**                 | Use Prisma ORM for efficient database operations.                               |
| 🎨  | **shadcnUI & TailwindCSS**     | Build the UI with shadcnUI & TailwindCSS for a sleek and intuitive interface.   |

<div align="center">
  <img src="public/images/1.png" alt="Image 1" style="width: 49%;"/>
  <img src="public/images/2.png" alt="Image 2" style="width: 49%;"/>
</div>

<div align="center">
  <img src="public/images/3.png" alt="Image 3" style="width: 49%;"/>
  <img src="public/images/4.png" alt="Image 4" style="width: 49%;"/>
</div>

---

## 🚀 Getting Started

**_Dependencies_**

Please ensure you have the following dependencies installed on your system:

`- node.js`

`- npm`

### 🔧 Installation

1. Clone the TaskManagement repository:

```sh
git clone https://github.com/TheoEwzZer/TaskManagement
```

2. Change to the project directory:

```sh
cd TaskManagement
```

3. Install the dependencies:

```sh
npm install
```

### 🤖 Running TaskManagement

```sh
npm run dev
```

---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/TheoEwzZer/TaskManagement/pulls)**: Review open PRs, and submit your own PRs.
- **[Report Issues](https://github.com/TheoEwzZer/TaskManagement/issues)**: Submit bugs found or log feature requests.

#### Contributing Guidelines

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.

   ```sh
   git clone <your-forked-repo-url>
   ```

3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.

   ```sh
   git checkout -b new-feature-x
   ```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.

   ```sh
   git commit -m 'Implemented new feature x.'
   ```

6. **Push to GitHub**: Push the changes to your forked repository.

   ```sh
   git push origin new-feature-x
   ```

7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is licensed under the `MIT` License. See the [LICENSE](https://github.com/TheoEwzZer/TaskManagement/blob/main/LICENSE) file for additional info.

---

## 👏 Acknowledgments

- This project was inspired by Trello for its design and features.
- This project was co-developed with [@TheoMars16](https://github.com/TheoMars16).

---
