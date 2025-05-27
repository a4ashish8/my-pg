exports.sendUserCredentials = (userId, password, url, name) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Welcome to StudyNotion</title>
		<style>
			body {
				background-color: #f9f9f9;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.5;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				background-color: #ffffff;
				border-radius: 8px;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
				text-align: center;
			}
	
			.logo {
				max-width: 180px;
				margin-bottom: 20px;
			}
	
			.header {
				font-size: 20px;
				font-weight: bold;
				color: #2d89ef;
				margin-bottom: 15px;
                margin-top: 10px;
			}
	
			.body {
				text-align: left;
			}
	
			.credentials {
				background-color: #f1f1f1;
				padding: 15px;
				border-radius: 5px;
				margin-top: 10px;
				margin-bottom: 20px;
				text-align: left;
			}
	
			.credentials p {
				margin: 5px 0;
			}
	
			.login-btn {
				display: inline-block;
				background-color: #2d89ef;
				color: #ffffff;
				padding: 10px 20px;
				border-radius: 5px;
				text-decoration: none;
				margin-top: 10px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
		</style>
	</head>
	
	<body>
		<div class="container">
			<a href="https://itwebtool.in/ashish/auto-ride">
				<img src="https://i.ibb.co/xScygV6v/Screenshot-1.png" alt="MY PG Logo" border="0" style="width: 100%;height: 27%;" /></a>


			<div class="header">Welcome to MY PG, ${name}!</div>
			<div class="body">
				<p>Your account has been created successfully. Here are your login credentials:</p>
				<div class="credentials">
					<p><strong>User ID:</strong> ${userId}</p>
					<p><strong>Password:</strong> ${password}</p>
				</div>
				<p>You can log in using the button below:</p>
				<a href="${url}" class="login-btn">Login Now</a>
				<p style="margin-top: 20px;">Please change your password after logging in for security reasons.</p>
			</div>
			<div class="support">
				If you have any questions or need help, contact us at 
                <br>
				<a href="mailto:ashish@itwebtool.com">ashish@itwebtool.com</a>.
			</div>
		</div>
	</body>
	
	</html>`;
};
