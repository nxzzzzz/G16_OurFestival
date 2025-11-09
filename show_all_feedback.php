<?php
$file = 'feedback_db.txt';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $visitor = htmlspecialchars($_POST['visitor']);
    $rating = htmlspecialchars($_POST['rating']);
    $comment = htmlspecialchars($_POST['comment']);

    $new_entry = [
        'visitor' => $visitor,
        'rating' => $rating,
        'comment' => $comment
    ];

    $data_line = json_encode($new_entry) . "\n";
    file_put_contents($file, $data_line, FILE_APPEND | LOCK_EX);
}

$all_entries_html = "";
if (file_exists($file)) {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $lines = array_reverse($lines);

    foreach ($lines as $line) {
        $entry = json_decode($line, true);
        $stars = str_repeat("⭐", $entry['rating']);
        $all_entries_html .= "<div class='list-group-item'>";
        $all_entries_html .= "<strong>" . $entry['visitor'] . "</strong> (ให้คะแนน: " . $stars . ")<br>";
        if (!empty($entry['comment'])) {
             $all_entries_html .= "<p style='white-space: pre-wrap; margin-top: 5px; margin-bottom: 0;'>" . $entry['comment'] . "</p>";
        }
    
        $all_entries_html .= "</div>";
    }
} else {
    $all_entries_html = "<p class='text-center'>ยังไม่มี Feedback</p>";
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>สรุป Feedback ทั้งหมด</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <header>
        <h1><a href="index.html" class="nav-link">HALLOWEEN</a></h1>
    </header>

    <div class="content mx-auto">
        <div class="p-3 border rounded" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
            <h3 style='text-align: center;'>สรุปข้อมูลประเมินความพึงพอใจ (ทั้งหมด)</h3>
            <p style="text-align: center;">(แสดงรายการล่าสุดก่อน)</p>
            <hr style='border-color: #ffb84d;'>
            
            <div class="list-group" style="max-height: 500px; overflow-y: auto;">
                <?php echo $all_entries_html; // พิมพ์รายการ Feedback ทั้งหมด ?>
            </div>

            <div class="text-center mt-4">
                <a href="feedback.html" class="btn btn-secondary">ส่ง Feedback เพิ่ม</a>
                <a href="index.html" class="btn btn-primary">กลับหน้าหลัก</a>
            </div>
        </div>
    </div>

    <footer>
        <p>© 2025 Our Halloween Festival</p>
    </footer>
</body>
</html>