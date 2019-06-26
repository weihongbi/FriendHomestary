package com.controller.lah;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cloopen.rest.sdk.CCPRestSmsSDK;
import com.entity.lah.Customers;
import com.sendMessage.JsonCrudModel;
import com.service.lah.CustService;

@Controller
@RequestMapping("cust")
public class CustomerController {
	@Autowired
    CustService cs;
	
	@RequestMapping("frontHtml")
    public String loginError(){
        return "front/Login";
    }
	@RequestMapping("fHtml")
    public String login(){
        return "front/list";
    }
	
    @RequestMapping("userlogin")
    public String Login(HttpServletRequest request,String cname,String password){
            try {
                List<Customers> list = cs.login(cname, password);
                System.out.println(list);
                if(list.size()==1){
                	request.getSession().setAttribute("Loginname",cname);
                    System.out.println(cname);
                    return "front/list";
                }else {
                    return "front/error";
                }
            }catch (Exception e){
                e.printStackTrace();
            }

        return "front/list";
    }
    
    @RequestMapping("custadd")
    public String add(@RequestParam("p") MultipartFile photo,HttpServletRequest request,Customers c) throws Exception, IOException {
		/*
		 * //添加盐值 ByteSource salt = ByteSource.Util.bytes(c.getCname());
		 * c.setPassword(new SimpleHash("MD5",c.getPassword(),salt,2).toHex());
		 */
    	
    	//tianjiatupian
    	String originalFilename = photo.getOriginalFilename();
		if(originalFilename !=null){
			String savaPath = "C:/Users/628000/git/FriendHomestary/src/main/resources/static/img";
			String newFileName = UUID.randomUUID().toString()+originalFilename;
			
			String savaFilePath = savaPath+"/"+newFileName;
			
			photo.transferTo(new File(savaFilePath));
			c.setPicture(newFileName);
			
		}
        cs.doadd(c);
        System.out.println(c);
        return "front/list";
    }
    
    @RequestMapping("getYzm")
    @ResponseBody
    public String yzm(HttpSession session,String iphone){
        HashMap<String, Object> result = null;
        //初始化SDK
        CCPRestSmsSDK restAPI = new CCPRestSmsSDK();
        restAPI.init("app.cloopen.com", "8883");
        restAPI.setAccount("8a216da86b2bc78f016b2c6383bb0059", "f1d573880d744fa5934c915487f39cb3");
        restAPI.setAppId("8a216da86b2bc78f016b2c6384230060");
        int randCode=(int)((Math.random()*9+1)*100000);
        String yzm=String.valueOf(randCode);
        result = restAPI.sendTemplateSMS(iphone,"1" ,new String[]{yzm,"1"});
        System.out.println("手动阀手动阀"+iphone);
        session.setAttribute("yzm",yzm);
        if("000000".equals(result.get("statusCode"))){
            //正常返回输出data包体信息（map）
            HashMap<String,Object> data = (HashMap<String, Object>) result.get("data");
            Set<String> keySet = data.keySet();
            for(String key:keySet){
                Object object = data.get(key);
                System.out.println(key +" = "+object);
            }
        }else{
            //异常返回输出错误码和错误信息
            System.out.println("错误码=" + result.get("statusCode") +" 错误信息= "+result.get("statusMsg"));
        }

        return  "";
    }

    @RequestMapping("yanzhengma")
    @ResponseBody
    public JsonCrudModel<Object> begin(HttpSession session , String yzm){
        final JsonCrudModel<Object> json = new JsonCrudModel<Object>();
        String yzm1 = (String)session.getAttribute("yzm");
        if(yzm!=null && yzm1!=null){
            if(yzm.equals(yzm1)){
                json.setMessage("success");
            }else{
                json.setMessage("error");
            }
        }else{
            json.setMessage("error");
        } return json;
    }
    
    
}
