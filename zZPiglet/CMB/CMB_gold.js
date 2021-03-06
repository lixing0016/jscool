const $ = new compatibility();

!(async () => {
	const cmb_gold =
		"cmbmobilebank://cmbls/functionjump?action=gocorpno&corpno=852216&cmb_app_trans_parms_start=here";
	$.notify("招商银行-年终奖理财分会场", "", "点击跳转去领黄金啦", cmb_gold);
})().finally(() => $done());

function compatibility() {
	_isQuanX = typeof $task != "undefined";
	_isLoon = typeof $loon != "undefined";
	_isSurge = typeof $httpClient != "undefined" && !_isLoon;
	this.read = (key) => {
		if (_isQuanX) return $prefs.valueForKey(key);
		if (_isLoon) return $persistentStore.read(key);
	};
	this.notify = (title, subtitle, message, url) => {
		if (_isLoon) $notification.post(title, subtitle, message, url);
		if (_isQuanX) $notify(title, subtitle, message, { "open-url": url });
		if (_isSurge) $notification.post(title, subtitle, message, { url: url });
	};
}
