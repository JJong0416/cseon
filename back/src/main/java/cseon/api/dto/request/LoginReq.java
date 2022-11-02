package cseon.api.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
public class LoginReq {

    @Pattern(regexp = "[a-z0-9]{6,15}")
    private final String accountName;

    @NotBlank
    @Size(min = 6, max = 100)
    private final String accountEmail;

    public LoginReq(String accountName, String accountEmail) {
        this.accountName = accountName;
        this.accountEmail = accountEmail;
    }
}