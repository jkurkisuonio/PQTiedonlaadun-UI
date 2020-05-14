# PQTiedonlaadun-UI
This Web interface for PQ Tiedonlaadun Alert service. You also need the service-part PQTiedonLaatuService, which can be located in:
https://github.com/jkurkisuonio/PQ-TiedonLaatuService/

To Install this project:

1. Clone this project and open it at Visual Studio.
2. Set SQL connectionstring to your appropriate SQL Server, where PrimusAlert-Database is located.
3. Invoke Update-Database command in Visual Studio's Package Manager Console. This should create nescessary database table's and schemas
for useraccount-login
3. Run this project and create local account.
4. Now create the primus alert's you wan't to use in AlertTypes-view. The following columns are needed.
    - Name. For informational use only.
    - Description. For informational use only.
    - PQ Query. This column is for informational use only. You can have this as a backup for query, it is not used for querying.
    - Query Name. This column is important. It has to have counterpart with same value as a query in Primus - this is the query that is used to get results from Primus.
    - Subject - Wilma message's subject.
    - Message Header - header part of the message
    - Message Body - this part is iterated several times, if same type of alert is found for current receiver of alert.
    - Message Footer - this is the end part of message.
    - In use - set this on to active primus alert.
5. Once you've created the alerts you should be good to go. Here are the format, that the alert's result from PrimusQuerry should follow:

<<<< OUTPUT >>>>
<halytykset>
#HEADER_STOP
#FOOTER_START
</halytykset>
#FOOTER_STOP
<opiskelija>
<korttinumero>
#DATA{V1};
</korttinumero>
<sukunimi>
#DATA{K2};
</sukunimi>
<etunimi>
#DATA{K3};
</etunimi>
<vastuukouluttaja>
<korttinumero>
#DATA{K152^V1};
</korttinumero>
<email>
#DATA{K152^K13};
</email>
</vastuukouluttaja>
</opiskelija>


