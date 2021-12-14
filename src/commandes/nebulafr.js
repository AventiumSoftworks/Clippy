module.exports = {
	"title": "Besoin d'aide avec Nebula?",
	"description": "Voici un guide rapide",
	"fields": [
		{
			"title": "1.",
			"description": "[Télécharge](https://github.com/dscalzi/Nebula) Nebula via la méthode zip de Github, ou via Git"
		},
		{
			"title": "2.",
			"description": "Installe les dependances avec `npm i`"
		},
		{
			"title": "3.",
			"description": "Crée un fichier .env avec le contenu suivant, ensuite, modifie les valeurs pour que ça corresponde avec tes besoins: ```\nJAVA_EXECUTABLE=C:\\Program Files\\AdoptOpenJDK\\jdk-16.0.1.9-hotspot\\bin\\java.exe\nROOT=D:\\TestRoot2\nBASE_URL=http://localhost:8080/\nHELIOS_DATA_FOLDER=C:\\Users\\user\\AppData\\Roaming\\Helios Launcher\n```\nJAVA_EXECUTABLE est l'emplacement vers ton fichier java.exe. ROOT est l'emplacement d'un dossier vide pour récupérer les fichiers qui seront générés plus tard. BASE_URL est la première partie où tu pourras télécharger les fichiers depuis ton serveur. HELIOS_DATA FOLDER est l'emplacement du dossier qui contient le distribution.json, les réglages etc."
		},
		{
			"title": "4.",
			"description": "Crée les fichers de base avec `npm start -- init root`"
		},
		{
			"title": "5.",
			"description": "Crée le serveur avec `npm start -- generate server [nom du serveur] [Version de Minecraft ex 1.12.2] --forge [Version de Forge ex 14.23.5.2859]`. Forge est requis."
		},
		{
			"title": "6.",
			"description": "Mets tes mods et autres fichiers dans le dossier ROOT\\servers\\tonserveur-mcversion"
		},
		{
			"title": "7.",
			"description": "Génère ton distribution.json `npm start -- generate distro`"
		},
		{
			"title": "8.",
			"description": "Envoie les fichiers générés sur ton serveur web"
		},
		{
			"title": "9.",
			"description": "Sur ton launcher, dans `app/assets/js/distromanager.js` ligne 540, modifie l'url pour qu'elle corresponde à l'url de ton distribution.json."
		}
	]
}