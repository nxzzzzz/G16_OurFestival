<?php
$file = 'registrations.json';

$all_data = [];
if (file_exists($file)) {
    $json_data = file_get_contents($file);
    $all_data = json_decode($json_data, true);

    if (!is_array($all_data)) {
        $all_data = [];
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $new_entry = [
        'fname'   => htmlspecialchars($_POST['first-name']),
        'lname'   => htmlspecialchars($_POST['last-name']),
        'gender'  => htmlspecialchars($_POST['gender']),
        'status'  => htmlspecialchars($_POST['status']),
        'age'     => htmlspecialchars($_POST['age']),
        'tel'     => htmlspecialchars($_POST['telephone']),
        'email'   => htmlspecialchars($_POST['email'])
    ];

    array_unshift($all_data, $new_entry);

    $new_json_data = json_encode($all_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

    file_put_contents($file, $new_json_data, LOCK_EX);
}

$all_entries_html = "";
if (empty($all_data)) {
    $all_entries_html = "<p class='text-center'>ยังไม่มีผู้ลงทะเบียน</p>";
} else {
    foreach ($all_data as $entry) {
        $all_entries_html .= "<div class='list-group-item'>";
        $all_entries_html .= "<strong>" . $entry['fname'] . " " . $entry['lname'] . "</strong><br>";
        $all_entries_html .= "<small>" . $entry['email'] . "</small>";
        $all_entries_html .= "</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="th">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>สรุปผู้ลงทะเบียนทั้งหมด</title>
    <link rel="stylesheet" href="css/style.css?v=11">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <header>
        <h1><a href="homepage.html" class="nav-link">HALLOWEEN</a></h1>
    </header>

    <main class="container my-4">
        <div class="p-3 border rounded text-white opacity-75" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); max-width: 800px; margin: auto;">
            <h3 style='text-align: center;'>สรุปข้อมูลผู้ลงทะเบียน (ทั้งหมด)</h3>
            <p style="text-align: center;">(แสดงรายการล่าสุดก่อน)</p>
            <hr style='border-color: #ffb84d;'>

            <div class="list-group" style="max-height: 500px; overflow-y: auto;">
                <?php echo $all_entries_html; // พิมพ์รายการ HTML ทั้งหมดที่อ่านได้ 
                ?>
            </div>

            <div class="text-center mt-4">
                <a href="homepage.html" class="btn btn-primary">กลับหน้าหลัก</a>
            </div>
        </div>
    </main>

    <footer>
        <p>© 2025 Our Halloween Festival</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>

</html>