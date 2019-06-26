package com.service.whb;

import com.dao.whb.NavigationDao;
import com.entity.whb.EasyuiNood;
import com.entity.whb.Navigation;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class TreeSerivce {
	@Resource
	NavigationDao dao;
	public List<EasyuiNood> getTree() {
		List<Navigation> list = dao.queryAll();
		return transfer(list);
	}

	private List<EasyuiNood> transfer(List<Navigation> list) {
		List<EasyuiNood> treeNoods = new ArrayList<EasyuiNood>();
		for (Navigation n : list) { 
			EasyuiNood nood = new EasyuiNood();
			nood.setId(n.getId());
			nood.setText(n.getText());
			nood.setIconCls(n.getIconCls());
			List<Navigation> childs = n.getChildren();
			if(childs!=null) {
				if (childs.size() > 0) {
					nood.setState("closed");
					nood.setChildren(transfer(childs));
				}
			}			 
			nood.setState("open");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("url", n.getUrl());
			nood.setAttributes(map);
			treeNoods.add(nood);
		}
		return treeNoods;
	}
	public List<EasyuiNood> getTreeByRid(Integer rid) {
		List<Navigation> list = dao.queryByRid(rid);
		String rids = dao.queryRids(rid);		
		return transferByRid(list, rids);
	}
	private List<EasyuiNood> transferByRid(List<Navigation> list,String rids) {
		List<EasyuiNood> treeNoods = new ArrayList<EasyuiNood>();
		// 封装每一行数据为节点EasyuiNood
		for (Navigation n : list) {			
			EasyuiNood nood = new EasyuiNood();
			nood.setId(n.getId());
			nood.setText(n.getText());
			nood.setIconCls(n.getIconCls());
			// stats,有子节点closed,没有子节点open
			List<Navigation> childs = n.getChildren();
			List<Navigation> child = new ArrayList<Navigation>();
			if(childs!=null){
				for (Navigation n2 : childs) {
					if (rids.contains(n2.getId().toString())) {
						child.add(n2);
					}
				}
				if (childs.size() > 0) {
					// 有子节点				
					nood.setState("open");	
					// children
					nood.setChildren(transferByRid(child, rids));
				}
			}
			nood.setState("open");	
			// attributes
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("url", n.getUrl());
			nood.setAttributes(map);
			treeNoods.add(nood);
		}
		
		return treeNoods;
	}
}
