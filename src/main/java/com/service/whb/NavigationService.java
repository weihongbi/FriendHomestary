package com.service.whb;

import com.dao.whb.NavigationDao;
import com.entity.whb.Navigation;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class NavigationService {
	@Resource
	NavigationDao dao;
	public List<Navigation> query() {
		return dao.query();
	}
	public String queryRids(Integer rid) {
		return dao.queryRids(rid);
	}
}
