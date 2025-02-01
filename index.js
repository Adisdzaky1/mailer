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

  const htt = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice Pembayaran</title>
    <style>
        /* Reset CSS */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            font-family: 'Poppins', Arial, sans-serif;
            background: #0d1117;
            color: #c9d1d9;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
        }

        .container {
            background: linear-gradient(135deg, #161b22, #0d1117);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
            max-width: 450px;
            width: 100%;
            border: 1px solid #30363d;
            text-align: center;
        }

        .checkmark {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #238636;
            margin: 0 auto 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px rgba(35, 134, 54, 0.8);
        }

        .checkmark::after {
            content: '✔';
            font-size: 1.8rem;
            color: white;
            font-weight: bold;
        }

        h1 {
            color: #58a6ff;
            font-size: 1.5rem;
        }

        .details {
            background: #21262d;
            padding: 12px;
            border-radius: 8px;
            margin: 15px 0;
            text-align: left;
            border: 1px solid #30363d;
        }

        .details p {
            margin: 8px 0;
            font-size: 0.9rem;
            
        }

        .details strong {
            color: #58a6ff;
        }

        .highlight {
            color: #f1c40f; /* Warna kuning terang untuk nilai variabel */
            font-weight: bold;
        }

        .invoice-button {
            display: block;
            background: #238636;
            color: white;
            padding: 12px 0;
            border-radius: 6px;
            text-align: center;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: bold;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 0 10px rgba(35, 134, 54, 0.5);
            margin-bottom: 15px;
        }

        .invoice-button:hover {
            background: #2ea043;
            transform: scale(1.05);
        }

        .footer {
            font-size: 0.8rem;
            color: #8b949e;
            text-align: center;
            margin-top: 15px;
        }

        .footer a {
            color: #58a6ff;
            text-decoration: none;
        }

        .footer a:hover {
            color: #1f6feb;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
            h1 {
                font-size: 1.2rem;
            }

            .checkmark {
                width: 50px;
                height: 50px;
            }

            .details {
                padding: 10px;
            }

            .details p {
                font-size: 0.85rem;
            }

            .invoice-button {
                font-size: 0.85rem;
                padding: 10px 0;
            }

            .footer {
                font-size: 0.75rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Tanda Centang -->
        <div class="checkmark"></div>

        <h1>Pembayaran Berhasil!</h1>
        <p style="color: #58a6ff; margin-bottom: 15px;">Terima kasih telah menyelesaikan pembayaran. Transaksi Anda telah berhasil diproses.</p>

        <!-- Detail Pembayaran -->
        <div class="details">
            <p><strong>ID Transaksi:</strong> <span class="highlight">${idtrx}</span></p>
            <p><strong>Nama Produk:</strong> <span class="highlight">${barang}</span></p>
            <p><strong>Jumlah Pembayaran:</strong> <span class="highlight">${total}</span></p>
            <p><strong>Tanggal Transaksi:</strong> <span class="highlight">${tanggal}</span></p>
        </div>

        <!-- Tombol Lihat Invoice -->
        <a href="${url}" class="invoice-button">Lihat Invoice</a>

        <!-- Footer -->
        <div class="footer">
            <p>Jika ada pertanyaan, hubungi kami di <a href="mailto:cs.ayotopup.official@gmail.com">cs.ayotopup.official@gmail.com</a></p>
            <p>&copy; 2025 AyoTopup. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

  sendEmail({ 
    from: '"AyoTopup Official" <cs.ayotopup.official@gmail.com>',
    to: recipient, 
    subject: "Transaksi Sukses: Top-Up Anda Telah Di Proses", 
    html: htt });
});

app.listen(5000, () => console.log("API listening on port 5000"));
