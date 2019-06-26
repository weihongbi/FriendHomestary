package com.controller.lah;

import com.cloopen.rest.sdk.CCPRestSmsSDK;
import com.sendMessage.JsonCrudModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Set;


@Controller
@RequestMapping("/yzm")
public class SMSController {

    @RequestMapping("Phonehtml")
    public String Phonehtml(){
        return "phone";
    }

    @RequestMapping("getYzm")
    @ResponseBody
    public String yzm(HttpSession session){
        HashMap<String, Object> result = null;
        //初始化SDK
        CCPRestSmsSDK restAPI = new CCPRestSmsSDK();
        restAPI.init("app.cloopen.com", "8883");
        restAPI.setAccount("8a216da86b2bc78f016b2c6383bb0059", "f1d573880d744fa5934c915487f39cb3");
        restAPI.setAppId("8a216da86b2bc78f016b2c6384230060");
        int randCode=(int)((Math.random()*9+1)*100000);
        String yzm=String.valueOf(randCode);
        result = restAPI.sendTemplateSMS("18736179644","1" ,new String[]{yzm,"1"});
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
