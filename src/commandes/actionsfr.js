module.exports = {
	"title": "Comment compiler le launcher avec Github Actions",
	"description": "Voici un guide rapide",
	"fields": [
		{
			"title": "1.",
			"description": "Tout d'abord, vérifiez que vous avez configuré `electron-builder.yml` et `dev-app-update.yml`"
		},
		{
			"title": "2.",
			"description": "Vérifiez que vous avez le fichier `build.yml` dans `.github/workflows/`, sinon, le launcher ne pourra pas se compiler."
		},
		{
			"title": "3.",
			"description": "Vérifiez la version que vous avez mis dans votre `package.json`, elle devrait ressembler à ceci : \"version\": \"X.X.X\","
		},
		{
			"title": "4.",
			"description": "Créez une [release draft sur github](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) et mettez le tag de la release comme suit : \"`vX.X.X`\" où X.X.X est la version dans votre `package.json`"
		},
		{
			"title": "5.",
			"description": "Poussez votre ou vos modifications sur votre repo sur github. Votre lanceur commencera à se compiler dans le cloud ! ☁️"
		},
		{
			"title": "6.",
			"description": "Vous pouvez vérifier le statut de la construction dans l'onglet des actions en haut de votre repo."
		},
		{
			"title": "7.",
			"description": "Une fois terminé, vous pouvez publier votre release et obtenir le launcher compilé."
		}
	]
}
