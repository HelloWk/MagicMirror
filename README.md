![][image-1]

# This is my Magic Mirror source code.

根据 [MichMich/MagicMirror][1] 改动，内容没有变，在原基础上添加了中文字体的支持，树莓派在英文环境也可以使用中文了，避免部分同学在调中文环境时发生的问题，可以省去配置树莓派支持中文这个步骤。

添加了室内温湿的模块，如果不需要的话可以在 `main.js` 里面注释掉 `tem_hum.init();`

室内温湿的模块使用的是 MQTT 接收数据，服务器地址和订阅地址可在 `config.js` 中修改。

监听的订阅地址如下：

温度：

	homekit/himitsu/temperature

湿度：

	homekit/himitsu/humidity

体感温度：

	homekit/himitsu/heatIndex


# 下面是改后的样子：

![][image-2]

[1]:	https://github.com/MichMich/MagicMirror

[image-1]:	logo.png
[image-2]:	http://7xr14u.com1.z0.glb.clouddn.com/magicmirror.png
