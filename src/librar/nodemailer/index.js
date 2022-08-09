// configure dotenv
require("dotenv").config();

// nodemailer
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../database");

// const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
// console.log({ CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN });
const carrier = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: 'OAuth2',
    user: "enigme.k2@gmail.com",
    clientId: "502497843315-504f8o7hhttmf7tdbd5me03t0dt94uum.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//04fezZlSOoVX5CgYIARAAGAQSNwF-L9IrF6h1smq8iMlY6EMKidnMsTHKEOmO-crzcHzlgO2gNWv6bayogknn5OuWfPNWK0r-rkM",
  },
});

const sendMail = async ({ email, TokenVerify }) => {
  const mail = {
    from: "Enigma Verification Team <enigme.k2@gmail.com>",
    to: email,
    subject: "Verification User Regist",
    html: `<html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Help - Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; box-sizing: border-box;">
          <table align="center" cellpadding="0" cellspacing="0" width="95%">
            <tr>
              <td align="center">
                <table
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  width="600"
                  style="border-spacing: 2px 5px;"
                  bgcolor="#fff"
                >
                  <tr>
                    <td align="center" style="padding: 5px 5px 5px 5px;">
                      <img
                        src="../../public/enigma.png"
                        alt="Enigma"
                        style="width:420px; margin: -100px -100px; border:0;"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#fff">
                      <table cellpadding="0" cellspacing="0" width="100%%">
                        <tr>
                          <td style="padding: 10px 0 10px 0; font-family: Nunito, sans-serif; font-size: 20px; font-weight: 900">
                            Aktifkan Akun ENIGMA Anda
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#fff">
                      <table cellpadding="0" cellspacing="0" width="100%%">
                        <tr>
                          <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px;">
                            Hallo New User Enigma
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                            Terima kasih telah mendaftar di Enigma Mohon
                            konfirmasi email ini untuk mengaktifkan akun Enigma Anda
                            Anda.
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px; text-align: center;">
                              <a href="http://localhost:2305/user/verified/${TokenVerify}"> Konfimasi Email </a>
                          
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                            Jika Anda kesulitan mengklik tombol "Konfirmasi
                            Email", copy dan paste URL di bawah ke dalam browser
                            Anda:
                            <p id="url">&#60;URL&#62;</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 50px 0; font-family: Nunito, sans-serif; font-size: 16px;">
                            Regards,
                            <p>ENIGMA</p>
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
      </html>`,
  };
  try {
    await carrier.sendMail(mail);
  } catch (error) {
    throw error;
  }
};
// console.log({ env: process.env });

// const mail = {
//   from: "Enigma Verification Team <enigme.k2@gmail.com>",
//   to: "rochafi.teach@gmail.com",
//   subject: "Verification User Regist",
//   html: `<h1>hello</h1>`,
// };

// // carrier.sendMail(mail).then(res => console.log("Email terkirim")).catch(err => console.error("error", err))


module.exports = { sendMail };
