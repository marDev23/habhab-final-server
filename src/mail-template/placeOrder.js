import { sender } from '../mail'
import { MAIL_ADDRESS } from '../config'
import { Address, Product, Shipment } from '../models'

export const placeOrderMail = async (user, orderNumber, args) => {
  const shipment = await Address.findById(args.addressId)
  console.log(shipment)
  const { input } = args
  // console.log(input)
  const productInfoArray = input.map(x => x.productId)
  const productInfo = await Product.find({ _id: { $in: productInfoArray } })
  const nameId = productInfo.map((x) => ({ id: `${x._id}`, name: x.name, description: x.description }))

  var newArray = []

  for (let i = 0; i < input.length; i++) {
    newArray.push({ id: input[i].id,
      productId: input[i].productId,
      quantity: input[i].quantity,
      price: input[i].price,
      details: []
    })
    for (let j = 0; j < nameId.length; j++) {
      if (input[i].productId === nameId[j].id) {
        newArray[i].details.push({
          id: nameId[j].id,
          name: nameId[j].name,
          description: nameId[j].description
        })
      }
    }
  }
  console.log(JSON.stringify(newArray, null, ' '))

  const placeOrderObj = {
    from: MAIL_ADDRESS,
    to: user.email,
    subject: 'Order Successfully Placed.',
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="telephone=no" />
      <title>HabHab Order Invoice</title>
      <style type="text/css" media="screen">
        body { padding:0 !important; margin:0 !important; display:block !important; background:#1e1e1e; -webkit-text-size-adjust:none }
        a { color:#a88123; text-decoration:none }
        p { padding:0 !important; margin:0 !important } 
        </style>
        <style media="only screen and (max-device-width: 480px), only screen and (max-width: 480px)" type="text/css">
        @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) { 
          div[class='mobile-br-5'] { height: 5px !important; }
          div[class='mobile-br-10'] { height: 10px !important; }
          div[class='mobile-br-15'] { height: 15px !important; }
          div[class='mobile-br-20'] { height: 20px !important; }
          div[class='mobile-br-25'] { height: 25px !important; }
          div[class='mobile-br-30'] { height: 30px !important; }
    
          th[class='m-td'], 
          td[class='m-td'], 
          div[class='hide-for-mobile'], 
          span[class='hide-for-mobile'] { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
    
          span[class='mobile-block'] { display: block !important; }
    
          div[class='wgmail'] img { min-width: 320px !important; width: 320px !important; }
    
          div[class='img-m-center'] { text-align: center !important; }
    
          div[class='fluid-img'] img,
          td[class='fluid-img'] img { width: 100% !important; max-width: 100% !important; height: auto !important; }
    
          table[class='mobile-shell'] { width: 100% !important; min-width: 100% !important; }
          td[class='td'] { width: 100% !important; min-width: 100% !important; }
          
          table[class='center'] { margin: 0 auto; }
          
          td[class='column-top'],
          th[class='column-top'],
          td[class='column'],
          th[class='column'] { float: left !important; width: 100% !important; display: block !important; }
          td[class='content-spacing'] { width: 15px !important; }
          div[class='h2'] { font-size: 44px !important; line-height: 48px !important; }
        } 
      </style>
    </head>
    <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; background:#1e1e1e; -webkit-text-size-adjust:none">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#1e1e1e">
        <tr>
          <td align="center" valign="top">
            <table width="600" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
              <tr>
                <td class="td" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; width:600px; min-width:600px; Margin:0" width="600">
                  <
    
                  <!-- Main -->
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td>
                        <!-- Head -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#d2973b">
                          <tr>
                            <td>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="3" bgcolor="#e6ae57"></td>
                                  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="10"></td>
                                  <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
                                    <div class="h3-2-center" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">HAB - HAB</div>
                                    <div class="h2" style="color:#ffffff; font-family:Georgia, serif; min-width:auto !important; font-size:60px; line-height:100px; text-align:center">
                                      <em>Thank you</em>
                                    </div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
    
                                    <div class="h3-2-center" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center; letter-spacing:5px">FOR YOUR ORDER!</div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="35" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="10"></td>
                                  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="3" bgcolor="#e6ae57"></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!-- END Head -->
    
                        <!-- Body -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                          <tr>
                            <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                            <td>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="35" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                              <div class="h3-1-center" style="color:#1e1e1e; font-family:Georgia, serif; min-width:auto !important; font-size:20px; line-height:26px; text-align:center">Feel free to review your invoice below or click the button to view you account.</div>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="20" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                        
                              <!-- Button -->
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td align="center">
                                    <table width="210" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td align="center" bgcolor="#d2973b">
                                          <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                              <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="15"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="50" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    </td>
                                              <td bgcolor="#d2973b">
                                                <div class="text-btn" style="color:#ffffff; font-family:Arial, sans-serif; min-width:auto !important; font-size:16px; line-height:20px; text-align:center">
                                                  <a href="#" target="_blank" class="link-white" style="color:#ffffff; text-decoration:none"><span class="link-white" style="color:#ffffff; text-decoration:none">MY ACCOUNT</span></a>
                                                </div>
                                              </td>
                                              <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="15"></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <!-- END Button -->
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="40" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
    
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <th class="column-top" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; Margin:0" valign="top" width="270">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
                                            <tr>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                              <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                                <div class="text-1" style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                  <strong>SHIPPING ADDRESS:</strong>
                                                </div>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                              </td>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                            </tr>
                                          </table>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fafafa">
                                            <tr>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                              <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                                <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                  <strong>${user.name}</strong>
                                                  <br />
                                                  ${shipment.baranggay} , ${shipment.municipal}
                                                  <br />
                                                  ${shipment.province}
                                                  <br />
                                                  ${user.mobile}
                                                </div>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                              </td>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th class="column-top" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; Margin:0" valign="top" width="20">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td><div style="font-size:0pt; line-height:0pt;" class="mobile-br-15"></div>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                  <th class="column-top" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top; Margin:0" valign="top" width="270">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
                                            <tr>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                              <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                                <div class="text-1" style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                  <strong>ORDER NUMBER:</strong> <span style="color: #1e1e1e;">${orderNumber}</span>
                                                </div>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                              </td>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                            </tr>
                                          </table>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="20" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
    
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f4">
                                            <tr>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                              <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                                <div class="text-1" style="color:#d2973b; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                  <strong>DATE ORDERED:</strong>
                                                </div>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                              </td>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                            </tr>
                                          </table>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fafafa">
                                            <tr>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                              <td>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                                <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">
                                                  ${args.datePlaced} 
                                                </div>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                              </td>
                                              <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </th>
                                </tr>
                              </table>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="40" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
    
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td style="border-bottom: 1px solid #f4f4f4;" class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                  <td style="border-bottom: 1px solid #f4f4f4;" width="225">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left"><strong>Item</strong></div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                  <td style="border-bottom: 1px solid #f4f4f4;" class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                  <td style="border-bottom: 1px solid #f4f4f4;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left"><strong>Qty</strong></div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                  <td style="border-bottom: 1px solid #f4f4f4;" class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                  <td style="border-bottom: 1px solid #f4f4f4;" width="60">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <div class="text-center" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:center"><strong>Total</strong></div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                  <td style="border-bottom: 1px solid #f4f4f4;" class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                </tr>
                                ${newArray.map(x =>
                                `<tr>
                                  <td>&nbsp;</td>
                                  <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">${x.details[0].name}</div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">${x.quantity}</div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                  <td>&nbsp;</td>
                                  <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <div class="text-center" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:center">P ${x.price * x.quantity}</div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="8" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                  <td>&nbsp;</td>
                                </tr>`
                                )}
                              </table>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="10" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
    
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" height="1" bgcolor="#d2973b">&nbsp;</td>
                                </tr>
                              </table>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
    
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td align="right">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                        <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                          <div class="text-right" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:right">Subtotal:</div>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                        </td>
                                        <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                        <td width="50">
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                          <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">$112.70</div>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                        </td>
                                        <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                                      </tr>
                                      <tr>
                                        <td>&nbsp;</td>
                                        <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                          <div class="text-right" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:right">Shipping:</div>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                        </td>
                                        <td>&nbsp;</td>
                                        <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                          <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left">$10.00</div>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                        </td>
                                        <td>&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td>&nbsp;</td>
                                        <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                          <div class="text-right" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:right"><strong>TOTAL:</strong></div>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                        </td>
                                        <td>&nbsp;</td>
                                        <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                          <div class="text" style="color:#1e1e1e; font-family:Arial, sans-serif; min-width:auto !important; font-size:14px; line-height:20px; text-align:left"><strong>$122.70</strong></div>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="3" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                        </td>
                                        <td>&nbsp;</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="35" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                            </td>
                            <td class="content-spacing" style="font-size:0pt; line-height:0pt; text-align:left" width="20"></td>
                          </tr>
                        </table>
                        <!-- END Body -->
    
                        <!-- Foot -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#d2973b">
                          <tr>
                            <td>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" width="3" bgcolor="#e6ae57"></td>
                                  <td>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="30" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <div class="text-footer" style="color:#666666; font-family:Arial, sans-serif; min-width:auto !important; font-size:12px; line-height:18px; text-align:center">
                                                  Libertad Tungawan,<span class="mobile-block"></span> Zamoanga Sibugay,<span class="mobile-block"></span> Philippines
                                                  <br />
                                                  <a href="http://www.YourSiteName.com" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none">www.YourSiteName.com</span></a>
                                                  <span class="mobile-block"><span class="hide-for-mobile">|</span></span>
                                                  <a href="mailto:email@yoursitename.com" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none">email@yoursitename.com</span></a>
                                                  <span class="mobile-block"><span class="hide-for-mobile">|</span></span>
                                                  Phone: <a href="tel:+1655606605" target="_blank" class="link-1" style="color:#666666; text-decoration:none"><span class="link-1" style="color:#666666; text-decoration:none">+1 (655) 606-605</span></a>
                                                </div>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="15" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                  </td>
                                </tr>
                              </table>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%"><tr><td height="24" class="spacer" style="font-size:0pt; line-height:0pt; text-align:center; width:100%; min-width:100%">&nbsp;</td></tr></table>
    
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td class="img" style="font-size:0pt; line-height:0pt; text-align:left" height="3" bgcolor="#e6ae57">&nbsp;</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <!-- END Foot -->
                      </td>
                    </tr>
                  </table>
                  <!-- END Main -->
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `

  }
  sender(placeOrderObj)
}
