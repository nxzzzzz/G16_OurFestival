<?php
$file = 'registrations_db.txt';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = htmlspecialchars($_POST['first-name']);
    $lname = htmlspecialchars($_POST['last-name']);
    $email = htmlspecialchars($_POST['email']);
    $new_entry = [
        'fname' => $fname,
        'lname' => $lname,
        'email' => $email
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
        $all_entries_html .= "<div class='list-group-item'>";
        $all_entries_html .= "<strong>" . $entry['fname'] . " " . $entry['lname'] . "</strong><br>";
        $all_entries_html .= "<small>" . $entry['email'] . "</small>";
        $all_entries_html .= "</div>";
    }
} else {
    $all_entries_html = "<p class='text-center'>ยังไม่มีผู้ลงทะเบียน</p>";
}
?>

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>สรุปผู้ลงทะเบียนทั้งหมด</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <header>
        <h1><a href="index.html" class="nav-link">HALLOWEEN</a></h1>
    </header>

    <main class="content mx-auto">
        <div class="p-3 border rounded" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
            <h3 style='text-align: center;'>สรุปข้อมูลผู้ลงทะเบียน (ทั้งหมด)</h3>
            <p style="text-align: center;">(แสดงรายการล่าสุดก่อน)</p>
            <hr style='border-color: #ffb84d;'>
            
            <div class="list-group" style="max-height: 500px; overflow-y: auto;">
                <?php echo $all_entries_html; // พิมพ์รายการ HTML ทั้งหมดที่อ่านได้ ?>
            </div>

            <div class="text-center mt-4">
                <a href="register.html" class="btn btn-secondary">ลงทะเบียนเพิ่ม</a>
                <a href="index.html" class="btn btn-primary">กลับหน้าหลัก</a>
            </div>
        </div>
    </main>

    <footer>
        <p>© 2025 Our Halloween Festival</p>
    </footer>
</body>
</html>