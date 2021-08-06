module.exports = {
	"title": "Need help with Nebula?",
	"description": "Here is TL;DR guide",
	"fields": [
		{
			"title": "1.",
			"description": "[Download](https://github.com/dscalzi/Nebula) Nebula using Github's zip method, or using Git"
		},
		{
			"title": "2.",
			"description": "Install dependancies using `npm i`"
		},
		{
			"title": "3.",
			"description": "Create .env file with the following values, then edit it to suit your needs ```\nJAVA_EXECUTABLE=C:\\Program Files\\AdoptOpenJDK\\jdk-16.0.1.9-hotspot\\bin\\java.exe\nROOT=D:\\TestRoot2\nBASE_URL=http://localhost:8080/\nHELIOS_DATA_FOLDER=C:\\Users\\user\\AppData\\Roaming\\Helios Launcher\n```\nJAVA_EXECUTABLE is the path to your java.exe file. ROOT is a path to an empty folder where you will get your nebula files. BASE_URL is the first part of the url where you will be able to download the files. HELIOS_DATA FOLDER is the path to the directory that contains distribution.json, settings etc."
		},
		{
			"title": "4.",
			"description": "Create your distribution root with `npm start -- init root`"
		},
		{
			"title": "5.",
			"description": "Create your server using `npm start -- generate server [server name] [Minecraft Version eg 1.12.2] --forge [forge version eg 14.23.5.2855]`. Please note Forge is required."
		},
		{
			"title": "6.",
			"description": "Put your mods, and libraries in folder ROOT\\servers\\yourserver-mcversion"
		},
		{
			"title": "7.",
			"description": "Generate distro `npm start -- generate distro`"
		},
		{
			"title": "8.",
			"description": "Upload generated files in your web server"
		},
		{
			"title": "9.",
			"description": "On your launcher, in `app/assets/js/distromanager.js` on line 540, edit the url to match your own distribution.json url"
		}
	]
}