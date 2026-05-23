<?php
$directory = __DIR__ . '/assets/images/';

// Function to convert images to webp
function convertToWebP($dir) {
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    $count = 0;
    
    foreach ($files as $file) {
        if ($file->isDir()) continue;
        
        $filePath = $file->getPathname();
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        
        if (in_array($ext, ['jpg', 'jpeg', 'png'])) {
            $webpPath = preg_replace('/\.(jpg|jpeg|png)$/i', '.webp', $filePath);
            
            if (!file_exists($webpPath)) {
                if ($ext === 'png') {
                    $image = @imagecreatefrompng($filePath);
                    if ($image !== false) {
                        imagepalettetotruecolor($image);
                        imagealphablending($image, true);
                        imagesavealpha($image, true);
                    }
                } else {
                    $image = @imagecreatefromjpeg($filePath);
                }
                
                if ($image !== false) {
                    imagewebp($image, $webpPath, 80);
                    echo "Converted: " . basename($filePath) . " -> " . basename($webpPath) . "\n";
                    $count++;
                } else {
                    echo "Skipped (Invalid/Corrupt): " . basename($filePath) . "\n";
                }
            }
        }
    }
    return $count;
}

echo "Starting WebP Conversion...\n";
$converted = convertToWebP($directory);
echo "Conversion complete! Total converted: $converted\n";
