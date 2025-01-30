const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const moment = require("moment-timezone");
require("moment/locale/id"); // Mengatur locale ke bahasa Indonesia





app.use(cors())
app.use(bodyParser.json());

app.post("/api/mail", (req, res) => {
  const to = req.body.recipient;
  
  
  const total = req.body.total;
  const idtrx = req.body.idtrx;
  const url = req.body.url;
  const barang = req.body.barang;
  const mt = req.body.metode;
  
  const tanggal = moment().tz("Asia/Jakarta").format("dddd, D MMMM YYYY");
  const sendEmail = async (mailDetails) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "cs.ayotopup.official@gmail.com",
        pass: "vqlhzvgnmygtyhyg",
      },
    });
    
    try {
      //console.log("Sending your email...");
      await transporter.sendMail(mailDetails);
      res.json({ status: true, msg: "Email Send Success" });
    } catch (error) {
      res.status(404).json({ status: false, msg: "Failed To Send mail" });
    }
  };

const htt =  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Pembayaran Sukses</title>
    <!-- CDN Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- CDN Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f8f9fa;">
    <div style="max-width: 640px; margin: 20px auto; background-color: #ffffff; border-radius: 15px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <!-- Bagian Header yang Dimodifikasi -->
<div style="text-align: center; margin-bottom: 30px;">
    <div style="
        display: inline-block;
        background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
        border-radius: 50%;
        width: 100px;
        height: 100px;
        position: relative;
        box-shadow: 0 4px 20px rgba(76,175,80,0.25);
        animation: checkPop 0.6s ease-out;
    ">
        <svg style="
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 48px;
            height: 48px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        " viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round">
            <path d="M20 6L9 17L4 12" style="stroke-dasharray: 24; stroke-dashoffset: 0; animation: checkDraw 0.4s ease-out 0.2s forwards;"/>
        </svg>
    </div>
</div>

<style>
    @keyframes checkPop {
        0% { transform: scale(0); opacity: 0; }
        60% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes checkDraw {
        from { stroke-dashoffset: 24; }
        to { stroke-dashoffset: 0; }
    }
</style>

        <!-- Content -->
        <div style="text-align: center;">
            <h1 style="color: #2c3e50; margin-bottom: 20px; font-weight: 600; font-size: 28px;">Pembayaran Berhasil Dilakukan! 🎉</h1>
            <p style="color: #7f8c8d; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Terima kasih telah menyelesaikan pembayaran. Berikut detail transaksi Anda:
            </p>
            
            <!-- Transaction Details -->
            <div style="background-color: #f8f9fa; padding: 25px; margin: 25px 0; border-radius: 12px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #7f8c8d;">ID Transaksi:</span>
                    <strong style="color: #2c3e50;">#${idtrx}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #7f8c8d;">Tanggal:</span>
                    <strong style="color: #2c3e50;">${tanggal}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #7f8c8d;">Jumlah:</span>
                    <strong style="color: #4CAF50;">Rp ${total}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #7f8c8d;">Metode Pembayaran:</span>
                    <strong style="color: #2c3e50;"><i class="fas fa-credit-card" style="margin-right: 8px;"></i>${mt}</strong>
                </div>
            </div>

            <!-- CTA Button -->
            <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 14px 35px; text-decoration: none; border-radius: 30px; margin: 20px 0; font-weight: 600; letter-spacing: 0.5px; transition: transform 0.3s ease; box-shadow: 0 4px 15px rgba(76,175,80,0.3);">
                <i class="fas fa-file-invoice-dollar" style="margin-right: 10px;"></i>Lihat Invoice
            </a>
        </div>

        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid #ecf0f1; text-align: center; color: #95a5a6; font-size: 14px;">
            <p style="margin: 8px 0;">
                <i class="fas fa-envelope" style="margin-right: 8px;"></i>
                <a href="cs.ayotopup.official@gmail.com" style="color: #4CAF50; text-decoration: none;">cs.ayotopup.official@gmail.com</a>
            </p>
            <p style="margin: 8px 0;">
                <i class="fas fa-phone" style="margin-right: 8px;"></i>
                +62 858-7727-6864
            </p>
            <p style="margin: 15px 0 0 0; color: #bdc3c7;">
                © 2025 AyoTopup. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
`;



sendEmail({
    from: "cs.ayotopup.official@gmail.com",
    to: to,
    subject: 'Transaksi Sukses: Top-Up Anda Telah Di Proses',
    html: htt,
  });
});
app.use((req, res, next) => {
  res
    .status(404)
    .json({
      status: false,
      msg: "no info",
    });
});
app.listen(5000, () => console.log("API listening on port 5000"));
