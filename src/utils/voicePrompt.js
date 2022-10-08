// // import Native from "../API/native-api";
function voicePrompt(text) {
	let windowSpeech = new SpeechSynthesisUtterance(text);
	windowSpeech.rate = 2; //播放语速
	windowSpeech.pitch = 0; // 音调高低
	// windowSpeech.text = "播放文本"
	windowSpeech.lang = "zh-CN";
	windowSpeech.volume = 1; //播放音量
	// speechSynthesis.cancel();
	speechSynthesis.speak(windowSpeech);
	// speak(text);
}
// export  voicePrompt;
// function voicePrompt(text) {
// 	new Audio("http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=" + text).play();
// }

export default voicePrompt;
