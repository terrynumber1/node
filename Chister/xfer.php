<!DOCTYPE html>
<html lang="en">
	<head>
		<title>BCC Transfer Central TV Wall</title>
		<script src="js/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){
				$('#loading').html("Loading clips...");
				setInterval(function(){
					$.get('getxfers.php',function(response){
						$('#xfers').html(response);
						$('#loading').hide();
					});
				}, 5000);
			});
		</script>
		<style type="text/css">
			body {
				margin: 0;
				padding: 0;
				background-color: black;
				color: white;
				font-size: 14px;
				font-family: "Lucida Grande", Verdana, "Lucida Sans Unicode", Arial, sans-serif;
			}
			.container {
				width: 75%; /* Display the right width of the container if you're on BCC TV */
				margin: 0 auto;
			}
			h1, h2 {
				text-align: center;
			}
			tr:nth-child(even) {
				background-color: #111111;
			}
			.completed {
				color: #3ce56a;
			}
			.metadata {
				color: #0092ff;
			}
			.stalled {
				color: #ffa500;
			}
			.failed {
				color: #ff0000;
			}
			td img {
				vertical-align: -3px;
				margin-right: 5px;
			}
			td a {
				color: white;
			}
		</style>
		<link rel="shortcut icon" href="img/xferfavicon.ico">
	</head>
	<body>
		<div class="container">
			<h1>MediaSource Transfer Central</h1>
			<h2 id="loading"></h2>
			<table id="xfers"></table>
		</div>
	</body>
</html>