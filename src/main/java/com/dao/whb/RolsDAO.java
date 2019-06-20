package com.dao.whb;

import com.entity.whb.R_N;
import com.entity.whb.Rols;
import org.apache.ibatis.annotations.Mapper;

import java.io.Serializable;
import java.util.List;

@Mapper
public interface RolsDAO {
	Serializable add(Rols r);
	int update(Rols r);
	int delrols(Integer rid);
	List<Rols> query();
	List<R_N> query(Integer rid);
}
