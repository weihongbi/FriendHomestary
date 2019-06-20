package com.entity.whb;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

public class Navigation implements Serializable {
	private Integer id;
	private String text;
	private String iconCls;
	private String url;	
	private Integer oprationEid;	
	private String oprationTime;	
	private Integer parentId;
	
	@OneToMany
	@JoinColumn(name = "parentId")
	private List<Navigation> children;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
   
	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
   
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
    
	public Integer getOprationEid() {
		return oprationEid;
	}

	public void setOprationEid(Integer oprationEid) {
		this.oprationEid = oprationEid;
	}
   
	public String getOprationTime() {
		return oprationTime;
	}

	public void setOprationTime(String oprationTime) {
		this.oprationTime = oprationTime;
	}
    
	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}
	public List<Navigation> getChildren() {
		return children;
	}

	public void setChildren(List<Navigation> children) {
		this.children = children;
	}

	@Override
	public String toString() {
		return "Navigation [id=" + id + ", text=" + text + ", iconCls="
				+ iconCls + ", url=" + url + ", oprationEid=" + oprationEid
				+ ", oprationTime=" + oprationTime + ", parentId=" + parentId
				+ ", children=" + children + "]";
	}

	
}
