package com.service.whb;

import com.dao.whb.R_NDAO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.Serializable;

@Service
public class R_NService {
	@Resource
	R_NDAO dao;
	
	public int rnDel(Integer rid) {
		return dao.rnDel(rid);
	}
	
	public Serializable rnAdd(Integer rid,Integer nid) {
		return dao.rnAdd(rid,nid);
	}
}
