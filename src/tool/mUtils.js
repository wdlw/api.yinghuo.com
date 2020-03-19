let _ = require('lodash');
require('should');
let moment = require('moment');
let config = require('../config');
const image2base64 = require('image-to-base64');
moment.locale('zh-cn');
const AV = require('leancloud-storage');
AV.init({
	appId: config.LEAN_APPID,
	appKey: config.LEAN_APPKEY,
	masterKey: config.LEAN_MASTERKEY,
});
let ERR_CODE = 1;
exports.assert = (condition, msg, err_code) => {
	if (!err_code) {
		err_code = ERR_CODE;
	}
	if (!condition) {
		msg.should.be.a.String();
		let err = new Error(msg);
		err.status = err_code;
		throw err;
	}
};
/*
var Sig = require('../libs/tlssdk/lib/TimGenerateSig.js');
let im_config = require('../libs/tlssdk/config/config');



exports.getIMSig = async (identifier)=>{
    let new_config = im_config;
    new_config.identifier = identifier;
    let sig = new Sig(new_config);
    let res = {};
    await sig.genSigAsync(function (userSig, expires) {
        res.userSig = userSig;
        res.expires = expires;
    });
    return res;
};
*/

exports.dateStr = (date) => {
	if(!date || typeof(date) === 'string'){
		date = new Date(date);
	}
	//获取js 时间戳
	var time = new Date().getTime();
	//去掉 js 时间戳后三位，与php 时间戳保持一致
	// console.log(time+" "+date.getTime())
	time = parseInt((time - date.getTime()) / 1000);

	//存储转换值
	var s;
	if (time < 60 * 10) {//十分钟内
		return '刚刚';
	} else if ((time < 60 * 60) && (time >= 60 * 10)) {
		//超过十分钟少于1小时
		s = Math.floor(time / 60);
		return s + "分钟前";
	} else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
		//超过1小时少于24小时
		s = Math.floor(time / 60 / 60);
		return s + "小时前";
	} else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
		//超过1天少于3天内
		s = Math.floor(time / 60 / 60 / 24);
		return s + "天前";
	} else {
		//超过3天
		// var date= new Date(parseInt(date) * 1000);
		return moment(date).format('ll');
		// return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	}
};

exports.completeImgUrl = (img_path) => {
	if (!img_path.startsWith("http")) {
		img_path = config.SERVER.URL_PREFIX + '/' + img_path;
	}
	return img_path;
};

exports.thumbnail = (imgurl, width) => {
	if (!width) {
		width = 540;
	}
	return imgurl + "?imageMogr2/thumbnail/" + width + "x";
};


exports.uploadImgByUrl = async (url) => {
	let b64 = await image2base64(url);

	// console.log("base64", b64);
	let urls = url.split('/');
	// console.log(urls);
	let file = new AV.File(urls[urls.length - 1], { base64: b64 });
	let res = await file.save();
	// console.log(res);
	return res.url();
};

exports.distance = (lat1,lng1,lat2,lng2) => {
	var radLat1 = Rad(lat1);
	var radLat2 = Rad(lat2);
	var a = radLat1 - radLat2;
	var  b = Rad(lng1) - Rad(lng2);
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
		Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
	s = s *6378.137 ;// EARTH_RADIUS;
	s = Math.round(s * 10000) / 10000; //输出为公里
	//s=s.toFixed(4);
	return s;
};
function Rad(d){
	return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}
