<?php
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	
	if (isset($_GET['id_evento'])) {
		$id_evento = $_GET['id_evento'];
		
		$sql = "SELECT ev.id_evento, ev.codigo, sal.nombre_salon, ev.nombre_evento, ev.codigo_qr, ev.habilitado, ev.descripcion, ev.fecha, sal.id_salon FROM eventos ev INNER JOIN salones sal ON ev.id_salon = sal.id_salon WHERE id_evento = '".$id_evento."'";
        
		$hostname = "localhost";
		$username = "lajoseacevedo";
		$password = "Canalla2012";
		$database = "partypic";
		$conn = new PDO("mysql:host=localhost;dbname={$database}", $username, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")); 
		
		$stmt = $conn->prepare($sql);
		$stmt->execute();
		$info_devuelta = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$info_devuelta;
		
		$rootPath = realpath('../imagenes_eventos/' . $id_evento);

		// Initialize archive object
		$zip = new ZipArchive();
		$zip->open('file.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);

		// Create recursive directory iterator
		/** @var SplFileInfo[] $files */
		$files = new RecursiveIteratorIterator(
			new RecursiveDirectoryIterator($rootPath),
			RecursiveIteratorIterator::LEAVES_ONLY
		);

		foreach ($files as $name => $file)
		{
			// Skip directories (they would be added automatically)
			if (!$file->isDir())
			{
				// Get real and relative path for current file
				$filePath = $file->getRealPath();
				$relativePath = substr($filePath, strlen($rootPath) + 1);

				// Add current file to archive
				$zip->addFile($filePath, $relativePath);
			}
		}

		// Zip archive will be created only after closing object
		$zip->close();
		
		$file = '../imagenes_eventos/file.zip';
		$fileName = 'Album-' . $info_devuelta[0]['nombre_evento'] . '.zip';
		header ("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		header('Content-Type: application/zip');
		header("Content-Transfer-Encoding: Binary");
		header("Content-length: ".filesize($file));
		header("Content-disposition: attachment; filename=\"".basename($fileName)."\"");
		readfile("$file"); 
		
		ignore_user_abort(true);

		unlink($file);
	}
?>