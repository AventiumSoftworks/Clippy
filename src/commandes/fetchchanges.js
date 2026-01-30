module.exports = {
	"title": "Update launcher from upstream",
	"description": "Here's a quick guide to fetch the latest changes from the original repository.",
	"fields": [
		{
			"title": "1.",
			"description": "First, you'll need to add the original repo as a remote origin. If you already done so, you can skip this step.\n`git remote add upstream https://github.com/dscalzi/HeliosLauncher.git`"
		},
		{
			"title": "2.",
			"description": "Ensure your git tree is clean, meaning every changes you made have been committed and pushed to your repo."
		},
		{
			"title": "3.",
			"description": "You may now fetch the history from the original repository using `git fetch upstream`"
		},
		{
			"title": "4.",
			"description": "You can now update your local branch and merge the latest changes on the original repo with `git merge upstream/master`"
		},
		{
			"title": "5.",
			"description": "Fix any merge conflict you may have. Here's an article from Github that may help you : [Resolving a merge conflict using the command line](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)"
		},
		{
			"title": "6.",
			"description": "Commit and push your changes"
		},
		{
			"title": "7.",
			"description": "Your repo is up to date! You can now push an update to your players."
		}
	]
}