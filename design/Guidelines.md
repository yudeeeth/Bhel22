# Guideline

I call it guidelines because you dont actually need to follow them strictly, honestly you dont need to at all, coz although these are good practices, they arent followed at all in corporate world. Atleast they are followed only by some departments even in big tech gaints. But its is good to know them.

## 1 Git workflow

So we will be using github extensively in the course of a few weeks. So here i ll just let you know how we ll work with git.

* First clone the mian repo into your system.
* Any local files that you don'd want to commit, add it to .gitignore. .env files are always supposed to be added in gitignore
* Then create a branch for you to work on, so choosing the amount of stuff to work on in a single commit is a tough job, but its upto you. you could make a commit for every function you make, but i think for UI it would be better if you work on all the functions and UI related to a component and then commit that as one it would work well.
* So once you are done with your work, commit it.
* Now pull code from remote.
* If there are commits on main after you started working, then you have to rebase your branch. So you can do that by checking out your feature branch and then 'git rebase main' and then commiting it. This basicallly puts your changes in the end of the git tree. Now push your branch to remote
* if there arent any commits  on main then you can just push your branch to remote.
* After this we ll check the changes and merge it togethor.

## 2 Recommended Tools

Download the following vscode extensions for making your dev life easier

1. REST Client or Thunder client for api testing
2. ES7+ React/Redux/React-Native snippets for react snippets ike creating a new component
3. Git graph to understand git commits and branches
4. Office Viewer (Markdown Editor) for viewing all kinds of files like png, exel, pdf, markdown, etc
5. Colorful comments recommended if you like to color code your comments

## 3 Git commit messages

Write your messages using this as a guide

![1666419655427](image/Guidelines/1666419655427.png)
