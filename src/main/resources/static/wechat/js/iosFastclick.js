$(function(){
	/*iOS 系统下默认的 click 事件会有300毫秒的延迟，
	 * 这个延迟是iOS系统的特性而不是jQuery WeUI设定的，
	 * 可以使用 fastclick 来消除这个延迟。*/
	FastClick.attach(document.body);
});