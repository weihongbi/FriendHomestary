package com.dao.whb;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface R_NDAO {
	//删除权限
	int rnDel(Integer rid);
	//添加权限
	Integer rnAdd(Integer rid, Integer nid);
}
