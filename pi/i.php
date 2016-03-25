<!DOCTYPE html>
<html lang="zh-CN">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>GPIO控制</title>
	<head>
		<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
		<script src="http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
		<link href="http://libs.baidu.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
		<script type="text/javascript">
		function light(state)
		{
			xmlhttp=new XMLHttpRequest();
			xmlhttp.open("GET","./control.php?pin="+$("#io").val()+"&state="+state,true);
			xmlhttp.onreadystatechange=function()
			{
			  if (xmlhttp.readyState==4)
				if(xmlhttp.status==200)$("#returndata").html(xmlhttp.responseText);
			}
			xmlhttp.send();
		}
		function blink()
		{
			xmlhttp=new XMLHttpRequest();
			xmlhttp.open("GET","./blink.php?pin="+$("#io").val(),true);
			xmlhttp.onreadystatechange=function()
			{
			  if (xmlhttp.readyState==4)
				if(xmlhttp.status==200)$("#returndata").html(xmlhttp.responseText);
			}
			xmlhttp.send();
		}
		function sbtn(btnnum)
		{
			document.getElementById("io").value=btnnum;
		}
		</script>
	</head>
	<body>
		<div class="col-md-12" style="margin: 20px;">
			<input class="form-control" id="io" value="0"><br>
			<button class="btn btn-primary" type="button" onclick="sbtn(0)">0</button>
			<button class="btn btn-primary" type="button" onclick="sbtn(1)">1</button>
			<button class="btn btn-primary" type="button" onclick="sbtn(2)">2</button>
			<button class="btn btn-primary" type="button" onclick="sbtn(3)">3</button>
			<button class="btn btn-primary" type="button" onclick="sbtn(4)">4</button><br><br>
			<button class="btn btn-success btn-lg btn-block" type="button" onclick="light(1)">亮</button><br>
			<button class="btn btn-success btn-lg btn-block" type="button" onclick="light(0)">灭</button><br>
			<button class="btn btn-success btn-lg btn-block" type="button" onclick="blink();">闪</button><br>
			<div id="returndata"></div>
		</div>
	</div>
	</body>
</html>
