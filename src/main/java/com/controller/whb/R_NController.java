package com.controller.whb;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.whb.R_NService;

@Controller
@RequestMapping("r_n")
public class R_NController {
	@Resource
	R_NService rnService;
	@RequestMapping("rnDelete")
	@ResponseBody
	public String rnDelete(Integer rid,@RequestParam String[] nids){
		rnService.rnDel(rid);
		for(int i=0; i<nids.length;i++ ){
			rnService.rnAdd(rid,Integer.parseInt(nids[i]));
		}
		return "1";
	}
}
