package com.dao.whb;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.entity.whb.R_N;
import com.entity.whb.Rols;

@Mapper
public interface RolsDAO {
	@Insert("INSERT INTO rols VALUES(null,#{rname})")
	public Integer add(Rols r);

	public int update(Rols r);
	@Delete("DELETE FROM rols WHERE rid=#{rid}")
	public int delrols(Integer rid);
	public int delnav(Integer nid);
	
	@Select("select rid,rname from rols")
	public List<Rols> queryRols();
	@Select("select * from R_N where rid=#{rid}")
	public List<R_N> query(Integer rid);
}
