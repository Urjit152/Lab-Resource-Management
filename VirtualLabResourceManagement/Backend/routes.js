const express = require("express");
const router = express.Router();
const db = require("./database");
const cors = require("cors");
//const nodemailer = require('nodemailer');

router.use(cors());

router.get("/l/show", (req, res) => {
  const query = "select * from fac";
  db.query(query, (err, result) => {
    res.send(result);
  });
});
router.get("/l/labs", (req, res) => {
  let id=req.query.id;
  const query = "select * from labs";
  db.query(query, (err, result) => {
    if (err) console.log(err);
    else {
      res.json({result}).end();
    }
  });
});

router.get("/l/labsin", (req, res) => {
  let id=req.query.id;
  const query = "select * from labs inner join lab_incharge on labs.lab_id=lab_incharge.lab_id";
  db.query(query, (err, result) => {
    if (err) console.log(err);
    else {
      res.json({result}).end();
    }
  });
});

router.get("/labs/error", (req, res) => {

  const query = "SELECT lab_id,COUNT(*)as count FROM error GROUP BY lab_id;";
  db.query(query, (err, result) => {

    if (err) console.log(err);
    else {
      res.json({result}).end();
    }
  });
});

router.get("/labs/pc", (req, res) => {
  
   const query = "SELECT lab_id,COUNT(*)as count FROM pc_details GROUP BY lab_id;";
   db.query(query, (err, result) => {

     if (err) console.log(err);
     else {
       res.json({result}).end();
     }
   });
 });
 

router.get("/l/labs/pc/:id", (req, res) => {
  let id=req.params.id;
  const query = "select * from pc_details where lab_id=?";
  db.query(query,id, (err, result) => {
    if (err) console.log(err);
    else {
      res.json({result}).end();
    }
  });
});

router.get("/l", (req, res) => {
  let data = req.body;
  // console.log(data.username);

  //console.log("ayo");
  const query =
    "insert into fac (fac_name,lab_id,fac_id) values('skv','sw3','f03')";
  db.query(query, (err, result) => {
    //console.log($query);
    //  if(err)send.log(err);
    // if(rows.length>0)
    // {
    //     res.send(rows);
    // console.log("aleready exist");
    // }
    // else
    // {
    //     res.send(rows);
    //     console.log("user can'nt found");
    // }
    console.log("error", err);
    console.log("result", result);
    res.send("hey rt");
  });
});
router.post("/login", async (req, res) => {
  let data = req.body;
  // console.log(data.username);
  $query = "select * from lab_incharge where labincharge_name=? AND password=?";
  db.query($query, [data.username, data.password], (err, rows) => {
  //console.log($query);
    if (err) console.log(err);
    if (rows.length > 0) {
      console.log({data:rows,message:"user"});
      res.json({ data: rows, message: "user" });
    }
  });
  $query = "select * from admin where ad_name=? AND password=?";
  db.query($query, [data.username, data.password], (err, rows) => {
    //console.log($query);
    if (err) send.log(err);
    if (rows.length > 0) {
      //res.send(rows);
      res.json({ data: rows, message: "admin" });
    }
  });
});
router.post("/l/take", async (req, res) => {
  let { fac_name, lb_id, fac_id } = req.body;
  // console.log(data.username);

  //console.log("ayo");
  const query = "insert into fac(fac_name,lb_id,fac_id) values(?,?,?)";
  db.query(query, [fac_name, lb_id, fac_id], (err, result) => {
    //console.log($query);
    if (err) {
      console.log(err);
    }
  });
});
router.delete("/l/remove/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(data.username);

  //console.log("ayo");
  const query = "delete from fac where id=?";
  db.query(query, id, (err, result) => {
    //console.log($query);
    if (err) {
      console.log(err);
    }
  });
});

router.delete("/pc/remove/:id", async (req, res) => {
  let { id} = req.params;
 // let {desc_id,sup_id,pc_id,lab_id}=req.body;
 console.log("1st "+id);
 const query = "select * from pc_details where id=?";
 db.query(query,id, (err, result) => {
   const pc_id=result[0].pc_no;
   const lab_id=result[0].lab_id;
   const desc_id=result[0].desc_id;
   const sup_id=result[0].sup_id;
   //console.log($query);
   if (err) {
     console.log("1"+err);
   }
   else
   {
    if(pc_id!=null&&lab_id!=null)
    {
    const q="delete from error where pcid=? and lab_id=?";
    
    db.query(q,[pc_id,lab_id], (err3, res3) => {
      //console.log($query);
      if (err3) {
        console.log("3"+err3);
      }
    });
  }
   if(id!=null)
   {
    const query3 = "delete from pc_details where id=?";
    
    db.query(query3,id, (err4, res4) => {
      //console.log($query);
      if (err4) {
        console.log("4"+err4);
      }
    });
   }
   if(desc_id!=null)
   {
    const query1 = "delete from description where desc_id=?";
    db.query(query1,desc_id, (err1, res1) => {
      //console.log($query);
      if (err1) {
        console.log("1"+err1);
      }
    });
  }
  if(sup_id!=null)
  {
    console.log("sup "+sup_id);
    const query2 = "delete from sup_details where sup_id=?";
    db.query(query2,sup_id, (err2, res2) => {
      //console.log($query);
      if (err2) {
        console.log("2"+err2);
      }
    });
    
  }
   }
 });
  
 
});

router.delete("/lab/remove/:id", async (req, res) => {
  let { id } = req.params;
  const query = "delete from pc_details where lab_id=? ";
  db.query(query,id, (err, result) => {
   
    if (err) {
      console.log(err);
    }
    else
    {
        const query = "delete from labs where lab_id=? ";
        db.query(query,id, (err, result) => {
      
        if (err) {
          console.log(err);
        }
        else
        {
            const query = "delete from lab_incharge where lab_id=? ";
            db.query(query,id, (err, result) => {
        
            if (err) {
              console.log(err);
            }
            });
            const query1 = "delete from description where lab_id=? ";
            db.query(query1,id, (err, result) => {
            if (err) {
              console.log(err);
            }
            });
            const query2 = "delete from sup_details where lab_id=? ";
            db.query(query2,id, (err, result) => {
            if (err) {
              console.log(err);
            }
            });
        }
        });
    }
  });
});

router.get("/l/show/:id", (req, res) => {
  const { id } = req.params;
  const query = "select * from fac where id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.put("/l/edit/:id", (req, res) => {
  const { id } = req.params;
  let { fac_name, lb_id, fac_id } = req.body;
  const query = "update fac set fac_name=?,lb_id=?,fac_id=? where id=?";
  db.query(query, [fac_name, lb_id, fac_id, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//---------------------additem-------------------

router.post("/lab/additem", async (req, res) => {
  let { pcid ,lab} = req.body;
  //console.log("this is "+pcid+" this "+lab);
  // console.log(data.username);

  //console.log("ayo");
   const query = "insert into pc_details(pc_no,lab_id) values(?,?)";
   db.query(query, [pcid,lab], (err, result) => {
    //console.log($query);
    if (err) {
      console.log(err);
    }
  });
});

//-----------------description-----------------------------

router.post("/lab/adddesc",(req,res) => {
  console.log("add desc ma");
  const {ram,hdd,manf_name,mon_type,purchase_date,warrenty,pcid,lab,desc_id}=req.body;
  let temp=""
  const sqlInsert =
  "INSERT INTO description (ram,hdd,manf_name,mon_type,purchase_date,warrenty,pc_id,lab_id) VALUES (?,?,?,?,?,?,?,?)";
  db.query(sqlInsert,[ram,hdd,manf_name,mon_type,purchase_date,warrenty,pcid,lab],(error,result)=>{
     console.log("result data"+result)
      if(error){
          console.log(error);
      }
      else
      {
        const sqlI="select desc_id from description where pc_id=? and lab_id=?";
        db.query(sqlI,[pcid,lab],(error,result)=>{
          console.log("lab and pc : "+pcid+lab)
          console.log("select result data"+result[0].desc_id)
             if(error)
             {
               console.log(error)
             }
             else
             {
              const sqlInsert =
              "update pc_details set desc_id=? where pc_no=? and lab_id=?" ;
              db.query(sqlInsert,[result[0].desc_id,pcid,lab],(error,res)=>{
                // console.log("result data"+result)
                  if(error){
                      console.log(error);
                  }
             });
            
       }});
      }
  }); 
 
 
});

router.get("/lab/getdesc/:id", (req, res) => {
  const { id } = req.params;
  const query = "select * from description where desc_id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});


router.put("/lab/editdesc/:id", (req, res) => {
  const { id } = req.params;
  const {ram,hdd,manf_name,mon_type,purchase_date,warrenty,pcid,lab,desc_id}=req.body;
  const query = "update description set ram=?,hdd=?,manf_name=?,mon_type=?,purchase_date=?,warrenty=? where desc_id=?";
  db.query(query, [ram,hdd,manf_name,mon_type,purchase_date,warrenty,desc_id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//---------suppliers----------
router.get("/lab/getsupp/:id", (req, res) => {
  const { id } = req.params;
  const query = "select * from sup_details where sup_id=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});


router.post("/lab/addsupp",(req,res) => {
  console.log("add desc ma");
 // console.log(req.body)
  const {sup_name,contact_no,pcid,lab}=req.body;
  let temp=""
  const sqlInsert =
  "INSERT INTO sup_details (sup_name,contact_no,pc_id,lab_id) VALUES (?,?,?,?)";
  db.query(sqlInsert,[sup_name,contact_no,pcid,lab],(error,result)=>{
     console.log("result data"+result)
      if(error){
          console.log(error);
      }
      else
      {
        const sqlI="select sup_id from sup_details where pc_id=? and lab_id=?";
        db.query(sqlI,[pcid,lab],(error,result)=>{
         // console.log("lab and pc : "+pcid+lab)
          //console.log("select result data"+result[0].desc_id)
             if(error)
             {
               console.log(error)
             }
             else
             {
              const sqlInsert =
              "update pc_details set sup_id=? where pc_no=? and lab_id=?" ;
              db.query(sqlInsert,[result[0].sup_id,pcid,lab],(error,res)=>{
                // console.log("result data"+result)
                  if(error){
                      console.log(error);
                  }
             });
            
       }});
      }
  }); 
 
 
});

router.put("/lab/editsupp/:id", (req, res) => {
  const { id } = req.params;
  const {sup_name,contact_no,pcid,lab}=req.body;
  const query = "update sup_details set sup_name=?,contact_no=? where sup_id=?";
  db.query(query, [sup_name,contact_no,id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.get("/api/get/adminerror/:id", (req,res)=>{ 
  //console.log("hey");
 // console.log(req.d);
 const {id}=req.params;
  const sqlGet = "SELECT * FROM error where lab_id=?";
  db.query(sqlGet,id,(error,result) =>{
      res.send(result);
  });
}); 

//-----------------------------------addlab-------------------------------

router.post("/labadd", async (req, res) => {
  let {labincharge_name,psword,lab_id,count,ram,hdd,manf_name,mon_type,purchase_date,warrenty,sup_name,contact_no} = req.body;
  const query = "insert into lab_incharge(labincharge_name,password,lab_id) values(?,?,?)";
   db.query(query, [labincharge_name,psword,lab_id], (err, result) => {
   
    if (err) {
      console.log(err);
    }
    else
    {
      
      const query = "insert into labs(lab_id,lab_name) values(?,?)";
      let temp="sw"+lab_id[2]
      db.query(query, [lab_id,temp], (err, result) => {
      
      if (err) {
        console.log(err);
      }
      else
       {

        for(var i=0;i<count;i++)
        {
          const query = "insert into pc_details(pc_no,lab_id) values(?,?)";
          let temp="pc"+(i+1);
          db.query(query, [temp,lab_id], (err, result) => {
        
          if (err) {
           console.log(err);
          }
          });
        }
        for(var i=0;i<count;i++)
        {
          const sqlInsert =
          "INSERT INTO description (ram,hdd,manf_name,mon_type,purchase_date,warrenty,pc_id,lab_id) VALUES (?,?,?,?,?,?,?,?)";
          let temp1="pc"+(i+1);
          db.query(sqlInsert,[ram,hdd,manf_name,mon_type,purchase_date,warrenty,temp1,lab_id],(error,result)=>{
        
              if(error){
                  console.log(error);
              }
              else
              {
                const sqlI="select desc_id from description where pc_id=? and lab_id=?";
                db.query(sqlI,[temp1,lab_id],(error,result)=>{
                     if(error)
                     {
                       console.log(error)
                     }
                     else
                     {
                      const sqlInsert =
                      "update pc_details set desc_id=? where pc_no=? and lab_id=?" ; 
                      db.query(sqlInsert,[result[0].desc_id,temp1,lab_id],(error,res)=>{
                        // console.log("result data"+result)
                          if(error){
                              console.log(error);
                          }
                     });
                    
               }});
              }
          }); 
        } 
        
        for(var i=0;i<count;i++)
        {

            const sqlInsert =
            "INSERT INTO sup_details (sup_name,contact_no,pc_id,lab_id) VALUES (?,?,?,?)";
            let temp2="pc"+(i+1);
            db.query(sqlInsert,[sup_name,contact_no,temp2,lab_id],(error,result)=>{
                if(error){
                    console.log(error);
                }
                else
                {
                  const sqlI="select sup_id from sup_details where pc_id=? and lab_id=?";
                  db.query(sqlI,[temp2,lab_id],(error,result)=>{
              
                      if(error)
                      {
                        console.log(error)
                      }
                      else
                      {
                        const sqlInsert =
                        "update pc_details set sup_id=? where pc_no=? and lab_id=?" ;
                        db.query(sqlInsert,[result[0].sup_id,temp2,lab_id],(error,res)=>{
                            if(error){
                                console.log(error);
                            }
                      });
                      
                }});
                }
            }); 

        }
        
      }
         
    });
    }
  });
});



router.get("/img/labs", (req, res) => {
  let id=req.query.id;
  //console.log("hey"+id);
  const query = "select * from image";
  db.query(query, (err, result) => {
    if (err) console.log(err);
    else {
     // console.log(result);
      res.json({result}).end();
    }
  });
});

router.get("/l/labs/img/:id", (req, res) => {
  let id=req.params.id;
  // console.log("raj show pc : ")
  // console.log(req.params.id);
  const query = "select * from image where lab_id=?";
  db.query(query,id, (err, result) => {
    if (err) console.log(err);
    else {
      //console.log(result);
      res.json({result}).end();
    }
  });
});

router.post("/admin/imgadd", async (req, res) => {
  let {lab_id,invoicenum,suppname,invdate,podate,itemname,itemdesc,quantity,rate,total_amt} = req.body;
  
   const query = "insert into image(lab_id,invoicenum,suppname,invdate,podate,itemname,itemdesc,quantity,rate,total_amt) values(?,?,?,?,?,?,?,?,?,?)";
   db.query(query, [lab_id,invoicenum,suppname,invdate,podate,itemname,itemdesc,quantity,rate,total_amt], (err, result) => {
    
    if (err) {
      console.log(err);
    }
  });
});

router.delete("/admin/img/remove/:id", async (req, res) => {
  let { id } = req.params;
  
  const query = "delete from image where imgid=? ";
  db.query(query,id, (err, result) => {
    
    if (err) {
      console.log(err);
    }
  });
});

router.get("/lab/viewimg/:id", (req, res) => {
  const { id } = req.params;
  const query = "select * from image where imgid=?";
  db.query(query, id, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("result : "+id)
    res.send(result);
  });
});

router.put("/lab/editimg/:imgid", (req,res)=>{
  const{ imgid } =req.params;
  const { lab_id,invoicenum,suppname,invdate,podate,itemname,itemdesc,quantity,rate,total_amt}= req.body;
 
  const sqlUpdate = "UPDATE image SET lab_id=?,invoicenum=?,suppname=?,invdate=?,podate=?,itemname=?,itemdesc=?,quantity=?,rate=?,total_amt=? WHERE imgid=?";
  db.query(sqlUpdate,[lab_id,invoicenum,suppname,invdate,podate,itemname,itemdesc,quantity,rate,total_amt,imgid],(error,result) =>{
      if(error){
          console.log(error);
      }
      res.send(result);
  }); 
});

router.get("/lab/getimg/:imgid", (req, res) => {
  const { imgid } = req.params;
  const id=parseInt(imgid, 10)
  const query = "select * from image where imgid=?";
  db.query(query,imgid, (err, result) => {
    console.log("are yar "+result[0].suppname)
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------lab-incharge------------------------------------------
//----------------------------------------------------------------------------------------------------------------

router.get("/api/get/:id", (req,res)=>{ 
  //console.log("hey");
 // console.log(req.d);
 const {id}=req.params;
  const sqlGet = "SELECT * FROM error where lab_id=?";
  db.query(sqlGet,id,(error,result) =>{
      res.send(result);
  });
}); 

router.get("/api/geterror/:id", (req,res)=>{ 
  
 const {id}=req.params;
  const sqlGet = "SELECT * FROM error where id=?";
  db.query(sqlGet,id,(error,result) =>{
      res.send(result);
  });
}); 

router.post("/api/post",(req,res) => {

  const {pcid,type,description,labid,tdate}=req.body;
  const sqlInsert =
  "INSERT INTO error (pcid,type,description,lab_id,tdate) VALUES (?,?,?,?,?)";
  db.query(sqlInsert,[pcid,type,description,labid,tdate],(error,result)=>{
      if(error){
          console.log(error);
      }
  }); 
});

router.delete("/api/remove/:id",(req,res) => {
  const { id }=req.params;
  const sqlRemove =
  "DELETE FROM error WHERE id = ?";
  db.query(sqlRemove, id,(error,result)=>{
      if(error){
          console.log(error);
      }
  });
});

router.get("/api/view/:id", (req,res)=>{
  const{ id } =req.params;
  
  const sqlGet = "SELECT * FROM error where id=?";
  db.query(sqlGet,id,(error,result) =>{
      if(error){
          console.log(error);
      }
      res.send(result);
  });
});


router.put("/api/update/:id", (req,res)=>{
  const{ id } =req.params;
  const {pcid,type,description,tdate}= req.body;
  // console.log("id : ");
  // console.log(id);
  const sqlUpdate = "UPDATE error SET pcid=?, type=?, description=?,tdate=? WHERE id=?";
  db.query(sqlUpdate,[pcid,type,description,tdate,id],(error,result) =>{
      if(error){
          console.log(error);
      }
      res.send(result);
  }); 
});

router.get("/",(req,res)=>{
  // const sqlInsert=
  // "INSERT INTO contact_db (name,email,contact) VALUES ('john doe','johndoe@gmail.com',1222645478)";
  // db.query(sqlInsert,(error,result)=>{
  //     console.log("error",error);
  //     console.log("result",result);
  //     res.send("Hello Express");
  // });
});

// router.listen(5000,()=>{
//   console.log("servers is running on port 5000");
// })

router.get("/l/labsin/:labid", (req, res) => {
  let id=req.query.id;
  const {labid}=req.params;
  //console.log("lbid"+labid);
  //console.log("hey"+id);
  const query = "select * from labs inner join lab_incharge on labs.lab_id=lab_incharge.lab_id where labs.lab_id=?";
  db.query(query,labid, (err, result) => {
    if (err) console.log(err);
    else {
     // console.log(result);
      res.json({result}).end();
    }
  });
});


// router.post('/forgotpassword', async (req,res) => {
//    emailid1=req.body.email
//    newpassword1=req.body.newpassword
//    confirmpassword1=req.body.confirmpassword
//    hashpass=await bcrypt.hash(newpassword1,10)
//   console.log("vid = "+vid);

//       console.log("vid = "+vid);

//       if(newpassword1==confirmpassword1)
//       {
//           db.query('select * from registration where Email=?',
//           [emailid1], (err,result,fields) =>{
//               if(err) throw err
//               console.log(emailid1);
//               if(result.length<=0){
//                   req.flash('message','Enter correct Email ID');
//                   res.redirect('/')
//               }
//               else{
//                   var sendOTP = Math.floor(1000+Math.random()*9000)
//                   console.log("email = " + emailid1 );
//                   console.log("forgot passwd otp = " + sendOTP);

//                   var mailOptions ={
//                       from: 'evotingteamofficer@gmail.com',
//                       to: emailid1,
//                       subject: 'Email Verification code for Forgot password',
//                       text:`Email Verification code for Forgot password is `+sendOTP  + `\n\nRegards`,
//                   }
                  
//                   transporter.sendMail(mailOptions,function(error,info){})
                      
                  
//                   res.redirect('/home/login/forgotpassword/otp');
//                   router.post('/forgototp', (req,res) => {
//                       var verifcode1=req.body.emailotp
//                       if(verifcode1==sendOTP){
//                           pool.query('update registration set password=? where VoterID=? and Email=?',
//                           [hashpass,voterid1,emailid1],(err,result,fields) =>{
//                               if(err) throw err
//                               if(result.length<=0){
//                                   req.flash('message','Enter correct data')
//                                   res.redirect('http://127.0.0.98:3000/home/login/forgotpassword/otp');
//                               }
//                               else
//                               {
//                                   req.flash('message','Paaword updated successfully');
//                                   res.redirect('/home/login')
//                               }
//                           })
//                       }
//                       else{
//                           req.flash('message','You have Entered Incorrect verification code');
//                           res.redirect('/home/login/forgotpassword/otp')
//                       }
//                   })
                      
//               }
//           })

//   }
      
// })

module.exports = router;
