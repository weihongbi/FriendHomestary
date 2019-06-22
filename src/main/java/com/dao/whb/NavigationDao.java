package com.dao.whb;

import com.entity.whb.Navigation;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;

import javax.persistence.CollectionTable;


@Mapper
public interface NavigationDao {
	@Select("select * from navigation where parentid = 0")
	List<Navigation> queryAll();
	@Select("select * from navigation")
	List<Navigation> query();
	
	//@Select("select * from navigation where id in (SELECT nid FROM r_n WHERE rid=#{value}) and parentid=0")
	//@Select("select n.*,nn.* from navigation n LEFT JOIN navigation nn on n.id = nn.parentid where n.id in (SELECT nid FROM r_n WHERE rid=1) and n.parentid=0 and nn.id in (SELECT nid FROM r_n WHERE rid=#{id})")
	List<Navigation> queryByRid(Integer rid);
	@Select("SELECT group_concat(nid) nid FROM r_n WHERE rid=#{value}")
	String queryRids(Integer rid);
	
	
	
	/*
	 * @Select("select  n.*,n2.parentid pid from navigation n LEFT JOIN navigation n2 on n.parentid=n2.parentid"
	 * )
	 * 
	 * @Results({@Result(property = "children",many = @Many(select =
	 * "com.dao.whb.NavigationDao.queryBynid",fetchType = FetchType.EAGER),column =
	 * "pid")}) List<Navigation> queryNavigationBySelect();
	 * 
	 * @Select("select * from navigation where parentid = #{value}") Navigation
	 * queryBynid(Integer parentid);
	 */
}
