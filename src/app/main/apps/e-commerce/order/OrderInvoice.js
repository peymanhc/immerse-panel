import React from 'react';
import {withStyles, Card, CardContent, Typography, TableCell, TableRow, TableBody, TableHead, Table} from '@material-ui/core';
import classNames from 'classnames';
import { withTranslate } from 'react-redux-multilingual';  //--maddahi-and addtranslate words--//

const styles = theme => ({
    root   : {
        '& table ': {
            '& th:first-child, & td:first-child': {
                paddingLeft: 0 + '!important'
            },
            '& th:last-child, & td:last-child'  : {
                paddingRight: 0 + '!important'
            }
        }
    },
    divider: {
        width          : 1,
        backgroundColor: theme.palette.divider,
        height         : 144
    },
    seller : {
        backgroundColor: theme.palette.primary.dark,
        color          : theme.palette.getContrastText(theme.palette.primary.dark),
        marginRight    : -88,
        paddingRight   : 66,
        width          : 480,
        '& .divider'   : {
            backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
            opacity        : .5
        }
    }
});

const OrderInvoice = ({classes, order, translate}) => {

   
    const options  =  { style : 'currency', currency : 'USD', minimumFractionDigits: 2 }
    const formatter = new Intl.NumberFormat('en-US', options   );
  //  const optionsRU  =  { style : 'currency', currency : 'RUB', minimumFractionDigits: 2 }
   // const formatterRU = new Intl.NumberFormat('ru-RU', optionsRU   );
  //  const optionsRIL  =  { style : 'currency', currency : 'RIL', minimumFractionDigits: 0 }
  //  const formatterRIL = new Intl.NumberFormat('ir-IR', optionsRIL   );


    return (
        <div className={classNames(classes.root, "flex-grow flex-no-shrink p-0")}>
          
            {order && (
                <Card className="w-l mx-auto" elevation={0}>

                    <CardContent className=" print:p-0">
                    {
                        order.date && 
                            <Typography color="textSecondary" className="mb-32">
                                {order.date.toString()}
                            </Typography>                       
                    }
                        <div className="flex justify-between">
                        {
                            order.customer &&                           
                                <div>
                                    <table className="mb-16">
                                        <tbody>
                                            <tr>
                                                <td className="pr-16 pb-4">
                                                    <Typography className="font-light" variant="h6" color="textSecondary">
                                                           <h4 className="text-center"> {translate('invoice')}    </h4>
                                                    </Typography>
                                                </td>
                                                <td className="pb-4">
                                                    <Typography className="font-light" variant="h6" color="inherit">
                                                         
                                                    </Typography>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
    
                                    <Typography color="textSecondary">
                                        {order.customer.firstName + ' ' + order.customer.lastName}
                                    </Typography>
    
                                    {order.invoiceAddress.length !== 0  && (
                                        <Typography color="textSecondary">
                                            {order.invoiceAddress[0].address}
                                        </Typography>
                                    )}
                                    {order.customer.phone && (
                                        <Typography color="textSecondary">
                                            {order.customer.phone}
                                        </Typography>
                                    )}
                                    {order.customer.email && (
                                        <Typography color="textSecondary">
                                            {order.customer.email}
                                        </Typography>
                                    )}
                            </div>                          
                        }


                            <div className= "flex items-center p-16" align="right">

                                <img className="w-80" src="https://pkhc.co.ir/admin/assets/images/ecommerce/s_8d70f073_siteLogo_p2.jpg" alt="logo"/>

                                
 
                            </div>
                       </div>

                        <div className="mt-24">

                            <Table className="simple">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>                 {translate('row')}        </TableCell>
                                        <TableCell>                 {translate('code')}    </TableCell>
                                        <TableCell>                 {translate('Product')}    </TableCell>
                                        <TableCell align="center">  {translate('Quantity')}   </TableCell>
                                        <TableCell align="center">  {translate('Price')}      </TableCell>                                       
                                        <TableCell align="center">  {translate('Total')}      </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Typography variant="subtitle1">{product.id}</Typography>
                                            </TableCell>
                                             <TableCell>
                                                <Typography variant="subtitle1">{product.code}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle1">{product.name}</Typography>
                                            </TableCell>
                                            <TableCell align="center">   {product.quantity}                  </TableCell>
                                            <TableCell align="center">     {formatter.format(product.price)}   </TableCell>
                                            
                                            <TableCell align="center">
                                                {formatter.format(product.price * product.quantity)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Table className="inline-block mt-32 w-1/2">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary"> {translate('SUBTOTAL')}     </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.subtotal)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary"> {translate('TAX')} </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.tax)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary"> {translate('DISCOUNT')}  </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-medium" variant="subtitle1" color="textSecondary">
                                                {formatter.format(order.discount)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography className="font-light" variant="h6" color="textSecondary"> {translate('Total')}  </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography className="font-light" variant="h6" color="textSecondary">
                                                {formatter.format(order.total)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody> 
                            </Table>

                       <div className=" w-1/2 inline-block " align="right">
                                    <Typography className="mb-24 print:mb-12" variant="body1">نحوه فروش</Typography>
                                    <div className="block"  >
                                        <form action="#" className="block">
                                                <span className="mr-32 " align="left">
                                                    <label>
                                                        <input name="group1" type="radio"/>
                                                        <span className="mr-16">نقدی</span>
                                                    </label>
                                                </span>
                                            <span className="mr-32">
                                                    <label>
                                                        <input name="group1" type="radio"/>
                                                        <span className="mr-16">غیرنقدی</span>
                                                    </label>
                                            </span>
                                        </form>
                                        <Typography className="block mt-16">
                                            اعتبار پیش فاکتور تا <span> ۱۳۹۸/۰۳/۰۲  </span> می باشد .
                                        </Typography>
                                        <Typography className="mt-16">
                                         *    مبالغ به ریال می باشد .
                                        </Typography>
                                    </div>
                        </div>




        </div>

                               



                        <h4 className="text-center">
                            شماره حساب شرکت پایا خودرو کاسپین
                        </h4>
                        <div className="mt-16">
                            <Table className="simple">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            ردیف
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            بانک
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            شماره حساب
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            شبا
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            کارت
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="border-solid border-1 border-gray-600">
                                            <Typography variant="subtitle1" align="center">1</Typography>
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            ملت
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            5660226769 </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            IR40 0120 0200 0000 5660 2267 69
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">6104
                                            - 3377- 5966 - 1513</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="border-solid border-1 border-gray-600">
                                            <Typography variant="subtitle1" align="center">2</Typography>
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            پاسارگاد
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            1001*8100*10714062*1 </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            IR59 0570 1001 8101 0714 0621 01
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">5022
                                            - 2970 - 0000 - 5723</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="border-solid border-1 border-gray-600"  align="center">
                                            <Typography variant="subtitle1">3</Typography>
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            ملی
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            221262284002
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            IR37 0170 0000 0022 1262 2840 02
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            *
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-solid border-1 border-gray-600">
                                        <TableCell className="border-solid border-1 border-gray-600">
                                            <Typography variant="subtitle1">4</Typography>
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            صادرات
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            212994105007
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            IR12 0190 0000 0021 2994 1050 07
                                        </TableCell>
                                        <TableCell className="border-solid border-1 border-gray-600" align="center">
                                            6037-6919-9015-2944
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </div>











                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(withTranslate(withTranslate(OrderInvoice)));
