module.exports = {
	title: "Codes d'erreurs fréquents",
	description: null,
	fields: [
		{
			title: "ETIMEDOUT",
			description: "Une connexion réseau a été interrompue par manque de temps avant d'être terminée."
		},
		{
			title : "ECONNREFUSED",
			description : "Le serveur a refusé la connexion. Cela se produit souvent lorsque le serveur web n'a pas démarré"
		},
		{
			title: "EHOSTUNREACH",
			description: "Une connexion réseau a été tentée avec un hôte distant inaccessible."
		},
		{
			title: "ECONNRESET",
			description: "Une connexion réseau a été réinitialisée par l'hôte distant."
		},
		{
			title: "ENETUNREACH",
			description: "Une connexion réseau a été tentée via un réseau inaccessible."
		},
		{
			title: "ESOCKETTIMEDOUT",
			description: "Une opération de socket a été interrompue avant d'être terminée."
		}
	]
}