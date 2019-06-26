package com.entity.lah;

public class Apartments {
    private Integer Apartmentsid;
    private Integer bedroom;
    private Integer parlor;
    private Integer toilet;
    private Integer cookhouse;
    private Integer balcony;

    public Integer getApartmentsid() {
        return Apartmentsid;
    }

    public void setApartmentsid(Integer apartmentsid) {
        Apartmentsid = apartmentsid;
    }

    public Integer getBedroom() {
        return bedroom;
    }

    public void setBedroom(Integer bedroom) {
        this.bedroom = bedroom;
    }

    public Integer getParlor() {
        return parlor;
    }

    public void setParlor(Integer parlor) {
        this.parlor = parlor;
    }

    public Integer getToilet() {
        return toilet;
    }

    public void setToilet(Integer toilet) {
        this.toilet = toilet;
    }

    public Integer getCookhouse() {
        return cookhouse;
    }

    public void setCookhouse(Integer cookhouse) {
        this.cookhouse = cookhouse;
    }

    public Integer getBalcony() {
        return balcony;
    }

    public void setBalcony(Integer balcony) {
        this.balcony = balcony;
    }

    @Override
    public String toString() {
        return "Apartments{" +
                "Apartmentsid=" + Apartmentsid +
                ", bedroom=" + bedroom +
                ", parlor=" + parlor +
                ", toilet=" + toilet +
                ", cookhouse=" + cookhouse +
                ", balcony=" + balcony +
                '}';
    }
}
