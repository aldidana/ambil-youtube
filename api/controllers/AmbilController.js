/**
 * AmbilController
 *
 * @description :: Server-side logic for managing ambils
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var unirest = require('unirest');

module.exports = {
	index: function(req, res) {
		res.view('homepage');
	},
	cariYoutube: function(req, res) {
		var url = req.body.youtube;
		var getId = url.split('https://www.youtube.com/watch?v=');
		var id = getId.join("");
		res.redirect('/ambil/'+id);
	},
	ambilYoutube: function(req, res) {
		var url = req.params.url;
		var thumbnail = "http://img.youtube.com/vi/"+url+"/mqdefault.jpg";

		unirest.get("https://ytgrabber.p.mashape.com/app/get/"+url)
			.header("X-Mashape-Key", "WuRinfWMAHmshcABlxPesUkGISJup1znDwejsnvzA5ToyJ9kRU")
			.header("Accept", "application/json")
			.end(function (result) {
					return res.view('youtube', {
						title: result.body.title,
						thumbnail: thumbnail,
						videos: result.body.link
					})
			});
	}
};

