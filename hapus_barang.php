<?php
include "koneksi.php";

if (isset($_POST['id'])) {
    $id_barang = $_POST['id'];

    $query = "DELETE FROM tabel_barang WHERE id_barang = $id_barang";
    $result = mysqli_query($koneksi, $query);

    if ($result) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
