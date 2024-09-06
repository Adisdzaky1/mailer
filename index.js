const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.post("/api/mail", (req, res) => {
  const sender = req.body.sender;
  const pass = req.body.password;
  const to = req.body.recipient;
  const subject = req.body.subject; 
  
  const total = req.body.total;
  const tanggal = req.body.tanggal;
  const idtrx = req.body.idtrx;
  const url = req.body.url;
  const barang = req.body.barang;
  
  const sendEmail = async (mailDetails) => {
    const transporter = nodemailer.createTransport({
      host: "mail.ayo-topup.xyz",
      port: 465,
      auth: {
        user: "info-invoice@ayo-topup.xyz",
        pass: "Asep@@12344",
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
    <title>Email Invoice</title>

    <!-- Load font only for non-Microsoft email clients -->
    <!--[if !mso]><!-->
    <style type="text/css">
        @import url("https://fonts.mailersend.com/css?family=Inter:400,600");
    </style>
    <!--<![endif]-->

    <!-- Responsive styles -->
    <style type="text/css" media="all">
        /* General Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            width: 100% !important;
            margin: 0;
            padding: 0;
            background-color: #f4f7fa;
            font-family: 'Inter', Helvetica, Arial, sans-serif;
            color: #4a5566;
        }

        table {
            border-spacing: 0;
            border-collapse: collapse;
            width: 100%;
        }

        img {
            max-width: 100%;
            display: block;
        }

        .content-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
        }

        .ms-content-body {
            padding: 40px;
        }

        @media only screen and (max-width: 640px) {
            .content-wrapper {
                width: 100% !important;
                border-radius: 0;
            }

            .ms-content-body {
                padding: 30px !important;
            }

            .info-lg {
                padding: 30px;
            }
        }

        /* Styles for Microsoft Outlook */
        <!--[if mso]>
        <style type="text/css">
            body, td, th, p, a, li, span, div {
                font-family: Arial, Helvetica, sans-serif !important;
            }
        </style>
        <![endif]-->
    </style>
</head>

<body>
    <!-- Preheader text: Hidden in email -->
  

    <!-- Main email content -->
    <table role="presentation" class="ms-body" align="center" width="100%">
        <tr>
            <td align="center">

                <!-- Outer container with max-width for responsiveness -->
                <table role="presentation" class="content-wrapper" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center">

                            <!-- Logo and spacing -->
                            <table role="presentation" class="ms-header">
                                <tr>
                                    <td height="40">&nbsp;</td>
                                </tr>
                            </table>

                            <!-- Main content section -->
                            <table role="presentation" class="ms-content" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="ms-content-body">

                                        <!-- Logo -->
                                        <p class="logo" style="text-align: center; font-weight: 600; font-size: 21px; color: #111;">
                                            <span style="color: #0052e2; font-size: 30px;">❖&nbsp;</span>Ayo Topup
                                        </p>
                                        <br>
                                        <!-- Greeting and message -->
                                        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 5px;">Hai,</h1>
                                        <p style="line-height: 27px; margin-bottom: 20px;">Terima kasih telah menggunakan AYO TOPUP. Ini adalah faktur untuk pembelian terbaru Anda.</p>

                                        <!-- Info box -->
                                        <table role="presentation" class="info" style="background-color: #f4f7fa; padding: 20px; border-radius: 4px;">
                                            <tr>
                                                <td><strong>Tanggal:</strong> ${tanggal}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Segera Bayar</strong> TERDAPAT BATAS WAKTU</td>
                                            </tr>
                                        </table>

                                        <!-- Button to pay the invoice -->
                                        <table align="center" role="presentation" style="margin: 30px 0;">
                                            <tr>
                                                <td align="center">
                                                    <a href="${url}" style="background-color: #0052e2; padding: 14px 30px; color: #FFF; text-decoration: none; font-weight: 600; border-radius: 3px; box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06);">Bayar Invoice</a>
                                                </td>
                                            </tr>
                                        </table>
                                        <br>
                                        <!-- Invoice details -->
                                        <table role="presentation" style="width: 100%;">
                                            <tr>
                                                <td>
                                                    <h3>${idtrx}</h3>
                                                </td>
                                                
                                            </tr>
                                        </table>

                                        <!-- Invoice items -->
                                        <table role="presentation" class="table" style="width: 100%; border-top: 1px solid #e2e8f0;">
                                            <tr>
                                                <th align="left" style="padding-top: 10px; color: #85878E;">Description</th>
                                                <th align="right" style="padding-top: 10px; color: #85878E;">Amount</th>
                                            </tr>
                                            <tr>
                                                <td>${barang}</td>
                                                <td align="right">${total}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total</strong></td>
                                                <td align="right"><strong>${total}</strong></td>
                                            </tr>
                                        </table>
                                        <br>
                                        <br>

                                        <!-- Footer info -->
                                        <p>Jika Anda memiliki pertanyaan atau ada kendala, Silahkan hubungi hubungi Admin <a href="https://t.me/Oficiallz" style="color: #0052e2;">support team</a>.</p>
                                        <p>Relix, <br>Tim AyoTopup</p>

                                        

                                    </td>
                                </tr>
                            </table>

                            <!-- Footer section -->
                            <table role="presentation" class="ms-footer">
                                <tr>
                                    <td align="center" style="padding: 40px;">
                                        <p>&copy; 2024 AYO TOPUP. All rights reserved.</p>
                                        <p>Jawa Tengah <br>Purwokerto <br>Arcamas, 53113</p>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>
                </table>

            </td>
        </tr>
    </table>
</body>

</html>
`;



sendEmail({
    from: "info@panell-vip.xyz",
    to: to,
    subject: subject,
    html: htt,
  });
});
app.use((req, res, next) => {
  res
    .status(404)
    .json({
      status: false,
      msg: "Visit https://github.com/Armanidrisi/Mailer For More Info",
    });
});
app.listen(5000, () => console.log("API listening on port 5000"));
