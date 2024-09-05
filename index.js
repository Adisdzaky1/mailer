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
      host: "mail.panell-vip.xyz",
      port: 468,
      auth: {
        user: "info@panell-vip.xyz",
        pass: "Asep@@12344",
      },
      tls: {
        rejectUnauthorized: false,
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
    <title>Email Template</title>

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
    <div class="preheader" style="display:none !important; visibility:hidden; mso-hide:all; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
        Preheader text goes here
    </div>

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

                                        <!-- Greeting and message -->
                                        <h1 style="font-size: 24px; font-weight: 600; color: #111; margin-bottom: 24px;">Hai</h1>
                                        <p style="line-height: 28px; margin-bottom: 20px;">Terimakasih Telah Order Di AYO TOPUP. Ini adalah faktur untuk pembelian terbaru Anda.</p>

                                        <!-- Info box -->
                                        <table role="presentation" class="info" style="background-color: #f4f7fa; padding: 20px; border-radius: 4px;">
                                            <tr>
                                                <td id="total"><strong>Jumlah yang Harus Dibayar:</strong>${total}</td>
                                            </tr>
                                             <tr>
                                                <td id="total"><strong>Segera selesaikan:</strong></td>
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

                                        <!-- Invoice details -->
                                        <table role="presentation" style="width: 100%;">
                                            <tr>
                                                <td>
                                                    <h3 id="idtrx">${idtrx}</h3>
                                                </td>
                                                <td align="right">
                                                    <h3 id="tanggal">${tanggal}</h3>
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
                                                <td id="barang">${barang}</td>
                                                <td id="total" align="right">${total}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Total</strong></td>
                                                <td id="total" align="right"><strong>${total}</strong></td>
                                            </tr>
                                        </table>

                                        <!-- Footer info -->
                                        <p>If you have any questions, reply to this email or reach out to our <a href="" style="color: #0052e2;">support team</a>.</p>
                                        <p>Cheers, <br>The {$account.name} Team</p>

                                        <p class="small" style="color: #4a5566;">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
                                        <p class="small">{$action_url}</p>

                                    </td>
                                </tr>
                            </table>

                            <!-- Footer section -->
                            <tr>
                    <td align="center" style="word-break:break-word;font-family:"Inter", Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;" >

                        <table class="ms-footer" width="640" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:640px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;" >
                            <tr>
                                <td class="ms-content-body" align="center" style="word-break:break-word;font-family:"Inter", Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;padding-top:40px;padding-bottom:40px;padding-right:50px;padding-left:50px;" >
                                    <p class="small" style="margin-top:20px;margin-bottom:20px;margin-right:0;margin-left:0;color:#96a2b3;font-size:14px;line-height:21px;" >&copy; 2020 {$account.name}. All rights reserved.</p>
                                    <p class="small" style="margin-top:20px;margin-bottom:20px;margin-right:0;margin-left:0;color:#96a2b3;font-size:14px;line-height:21px;" >
                                        1234 Street Rd.
                                        <br>Suite 1234
                                        <br>City, State, ZIP Code
                                    </p>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
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
    from: "CS-AyoTopup-Official@propertidnr.my.id",
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
