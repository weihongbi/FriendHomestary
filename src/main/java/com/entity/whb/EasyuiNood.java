package com.entity.whb;

import java.util.List;
import java.util.Map;

public class EasyuiNood {

	private Integer id;// 节点ID，对加载远程数据很重要。
	private String text;// 显示节点文本。
	private String state;// 节点状态，'open'或 'closed'，默认：'open'
	private String checked;// 表示该节点是否被选中。
	private String iconCls;
	private Map<String, Object> attributes;// 被添加到节点的自定义属性。
	private List<EasyuiNood> children;// 一个节点数组声明了若干节点。

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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public Map<String, Object> getAttributes() {
		return attributes;
	}

	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}

	public List<EasyuiNood> getChildren() {
		return children;
	}

	public void setChildren(List<EasyuiNood> children) {
		this.children = children;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	@Override
	public String toString() {
		return "EasyuiNood [id=" + id + ", text=" + text + ", state=" + state
				+ ", checked=" + checked + ", iconCls=" + iconCls
				+ ", attributes=" + attributes + ", children=" + children + "]";
	}

}
