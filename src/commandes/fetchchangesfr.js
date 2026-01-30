module.exports = {
	"title": "Mettre à jour le launcher",
	"description": "Comment mettre à jour le launcher avec les modifications du repo originel ?",
	"fields": [
		{
			"title": "1.",
			"description": "Premièrement, vous devez ajouter le repo originel en tant qu'origine distance. Si vous l'avez déjà fait, passez cette étape.\n`git remote add upstream git@github.com:dscalzi/HeliosLauncher.git`"
		},
		{
			"title": "2.",
			"description": "Assurez-vous que votre branche locale est propre, autrement dit, que toutes vos modifications ont bien été \"commit\" et poussées."
		},
		{
			"title": "3.",
			"description": "Vous pouvez maintenant récupérer l'historique du repo originel avec `git fetch upstream`"
		},
		{
			"title": "4.",
			"description": "Procédez à la mise à jour de votre branche locale et à la fusion des derniers changements sur le repo originel à l'aide de `git merge upstream/master`"
		},
		{
			"title": "5.",
			"description": "Réparez les potentils conflits de fusion que vous pourriez avoir. Voilà un article de GitHub pour vous aider : [Résolution d’un conflit de fusion en utilisant la ligne de commande](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)"
		},
		{
			"title": "6.",
			"description": "Faîtes un \"commit\" et poussez vos changements."
		},
		{
			"title": "7.",
			"description": "Votre repo est maintenant à jour ! Vous pouvez publier une mise à jour à vos joueurs."
		}
	]
}