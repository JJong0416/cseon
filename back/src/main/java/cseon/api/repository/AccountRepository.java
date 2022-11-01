package cseon.api.repository;

import cseon.domain.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Account account SET account.successCount = account.successCount+1 WHERE account.accountId = :accountId")
    int updateAccountSuccess(Long accountId);

}
