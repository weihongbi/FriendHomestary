package com.dao.whb;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface R_NDAO {
	//删除权限
	@Delete("DELETE FROM R_N WHERE rid = #{rid}")
	int rnDel(Integer rid);
	//添加权限
	@Insert("insert into r_n values (null,#{rid},#{nid})")
	Integer rnAdd(Integer rid,Integer nid);	
}
