module.exports = {
	"title": "How to build the launcher with Github Actions",
	"description": "Here is TL;DR guide",
	"fields": [
		{
			"title": "1.",
			"description": "First, check that you configured `electron-builder.yml` and `dev-app-update.yml`"
		},
		{
			"title": "2.",
			"description": "Verify that you have the `build.yml` file in `.github/workflows/`, otherwise, it will not work."
		},
		{
			"title": "3.",
			"description": "Check the version you registered in your `package.json`, it should look like this: \"version\": \"X.X.X\","
		},
		{
			"title": "4.",
			"description": "Create a [draft release on github](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) and put the tag of the release as follow: \"`vX.X.X`\" where X.X.X is the version in your `package.json`"
		},
		{
			"title": "5.",
			"description": "Push your change(s) to your remote repo on github. Your launcher will start build in the cloud ! ☁️"
		},
		{
			"title": "6.",
			"description": "You can check the build status in the action tab in the top of your repo."
		},
		{
			"title": "7.",
			"description": "Once finished, you can publish your release and get the compiled launcher."
		}
	]
}