const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const moment = require("moment-timezone");
require("moment/locale/id");

app.use(cors());
app.use(bodyParser.json());

app.post("/api/mail", (req, res) => {
  const { recipient, total, idtrx, url, metode, barang } = req.body;

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
      await transporter.sendMail(mailDetails);
      res.json({ status: true, msg: "Email Send Success" });
    } catch (error) {
      res.status(404).json({ status: false, msg: "Failed To Send mail" });
    }
  };

  const htt = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Konfirmasi Pembayaran Sukses</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
    <div style="max-width: 640px; margin: 20px auto; background-color: #ffffff; border-radius: 15px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="
                display: inline-block;
                background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
                border-radius: 50%;
                width: 100px;
                height: 100px;
                position: relative;
                box-shadow: 0 4px 20px rgba(76,175,80,0.25);
                animation: checkPop 0.6s ease-out;">
                <svg style="
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 48px;
                    height: 48px;" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round">
                    <path d="M20 6L9 17L4 12"/>
                </svg>
            </div>
        </div>

        <!-- Content -->
        <div style="text-align: center;">
            <h1 style="color: #2c3e50; margin-bottom: 20px; font-size: 28px;">Pembayaran Berhasil Dilakukan! 🎉</h1>
            <p style="color: #7f8c8d; font-size: 16px; margin-bottom: 30px;">
                Terima kasih telah menyelesaikan pembayaran. Berikut detail transaksi Anda:
            </p>
            
            <!-- Transaction Details -->
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #7f8c8d;">ID Transaksi: </span>
                    <strong style="color: #2c3e50; font-weight:300;">#${idtrx}</strong>
                </div>
               
                 <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #7f8c8d;">Produk: </span>
                    <strong style="color: #2c3e50; font-weight:300;">${barang}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #7f8c8d;">Total Harga: </span>
                    <strong style="color: #4CAF50; font-weight:300;">Rp ${total}</strong>
                </div>
                 <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="color: #7f8c8d;">Tanggal: </span>
                    <strong style="color: #2c3e50; font-weight:300;">${tanggal}</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #7f8c8d;">Metode Pembayaran: </span>
                    <strong style="color: #2c3e50; font-weight:300;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm14 0H2v2h12V4z"/>
                        </svg>
                        ${metode}
                    </strong>
                </div>
            </div>

            <!-- CTA Button -->
            <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 14px 35px; text-decoration: none; border-radius: 30px;">
                Lihat Invoice
            </a>
        </div>

        <!-- Footer -->
        <tr>
            <td style="padding: 20px 0; text-align: center; color: #636e72; font-size: 12px;">
                <p>Jika Anda memiliki pertanyaan, hubungi kami di <a href="mailto:cs.ayotopup.official@gmail.com" style="color: #4CAF50;">cs.ayotopup.official@gmail.com</a></p>
                <p>© 2025 AyoTopup. All rights reserved</p>
            </td>
        </tr>
    </div>
</body>
</html>`;

  sendEmail({ from: "cs.ayotopup.official@gmail.com", to: recipient, subject: "Transaksi Sukses", html: htt });
});

app.listen(5000, () => console.log("API listening on port 5000"));
